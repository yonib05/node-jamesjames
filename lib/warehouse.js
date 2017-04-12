/**
 * Created by yoni on 2/24/17.
 */
var JaySchema = require('jayschema');
var _ = require('underscore');
var util = require('util');
var crypto = require('crypto');
var req = require('request');


module.exports = function () {

    // Default Settings
    var defaultSettings = {
        url: 'https://api.controlport.co.uk/api/1/',
        credentials: {
            api_key: '3cac28674ca5c525af980b3cd92e9245'
        },
        allow_preorder : false,
        update_stock : false,
        test : false,
        debugLogs: false  // Only use it during development or testing
    };


    // Definitive settings
    var settings = defaultSettings;


    // Cache for Client
    var initedClient;

    // Expose methods
    return {

        settings: function (customSettings) {
            settings = _.extend(defaultSettings, customSettings || {});
            return this;
        },
        createOrder: function (order, callback) {

            // Input Validation
            var orderValidation = validateOrder(order); // returns array of problems or 'SUCCESS'
            if (orderValidation !== 'SUCCESS') {
                debugLog('Order Validation Failed', orderValidation);
                return callback(new Error('PRE_VALIDATION_ERROR'), orderValidation);
            }

            request('order', order, function (err, result) {
                if(err) {
                    debugLog("Connection Error", err);
                    return callback(err, null)
                }
                return callback(null, result);





            });


        }









    };




    /*      Auxiliary functions       */

    function debugLog(title, msg) {
        var msg = util.inspect(msg, {depth: null});
        if (settings.debugLogs) {
            console.log('\n    Warehouse Connector DEBUG log' + '\n  · ' + title + ':\n\n ', msg, '\n');
        }
    }



    /*      Request         */


    function request(type, data, callback) {
        var payload = {};

        //calculate authentication data
        var unixTime = Math.floor((new Date()).getTime() / 1000);
        payload.half_api_key = settings.credentials.api_key.substring(0,16);
        payload.message_timestamp = unixTime;
        payload.security_hash = crypto.createHash('md5').digest(unixTime + settings.credentials.api_key).toString();
        // add config options
        payload.allow_preorder = settings.allow_preorder;
        payload.update_stock = settings.update_stock;
        payload.test = settings.test;
        //add order data
        payload[type]=data;

        debugLog('Sending Payload', payload);

        req({
            url: settings.url + type,
            json : true,
            method : 'POST',
            body: JSON.stringify(payload)

        }, function (error, response, body) {
            if(error) return callback(error,null);
            callback(null, body);
        });






    }




    /*      Validation Methods      */


    function validateOrder(order) {

        var orderSchema = {
            "type": "object",
            "properties": {
                "client_ref": {"type": "string", "maximum": 32},
                "po_number": {"type": "string", "maximum": 32},
                "date_placed": {"type": "string", "format": "date-time"},
                "postage_speed": {"type": "integer", "minimum": 0, "maximum": 3 },
                "allow_saturday": {"type": "boolean"},
                "signed_for": {"type": "boolean"},
                "no_signature": {"type": "boolean"},
                "tracked": {"type": "boolean"},
                "postage_cost": {"type": "number"},
                "total_value": {"type": "number"},
                "currency_code": {"type": "string", "maximum": 3},
                "tissue_wrap": {"type": "boolean"},
                "days_before_bbe": {"type": "integer"},
                "hold": {"type": "boolean"},
                "callback_url": {"type": "string", "maximum": 200, "format" : "uri"},
                "warehouse_id": {"type": "integer"},

                "ShippingContact": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string", "maximum": 64},
                        "company": {"type": "string", "maximum": 64},
                        "email": {"type": "string", "format":"email", "maximum": 64},
                        "phone": {"type": "string",  "maximum": 32},
                        "address": {"type": "string", "maximum": 32},
                        "address_contd" : {"type": "string", "maximum": 32},
                        "city": {"type": "string"},
                        "county": {"type": "string"},    // if shipping to USA address
                        "postcode": {"type": "string"},
                        "country": {"type": "string"}

                    },
                    "required": ['name', 'phone', 'address', 'city', 'postcode', 'country']
                },

                "BillingContact": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string", "maximum": 64},
                        "company": {"type": "string", "maximum": 64},
                        "email": {"type": "string", "format":"email", "maximum": 64},
                        "phone": {"type": "string",  "maximum": 32},
                        "address": {"type": "string", "maximum": 32},
                        "address_contd" : {"type": "string", "maximum": 32},
                        "city": {"type": "string",  "maximum": 32},
                        "county": {"type": "string",  "maximum": 32},
                        "postcode": {"type": "string",  "maximum": 16},
                        "country": {"type": "string",  "maximum": 32}

                    },
                    "required": ['name', 'phone', 'address', 'city', 'postcode', 'country']
                },


                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "client_ref": {"type": "string", "maximum": 32},
                            "quantity": {"type": "integer"},
                            "price": {"type": "number"},
                            "days_before_bbe": {"type": "integer"}
                        },
                        "required": ['client_ref', 'quantity', 'price']
                    }
                }

            },
            "required": ['client_ref', 'ShippingContact', 'BillingContact', 'items']
        };

        // First, check if the order pass the jsonSchema validation
        var js = new JaySchema();
        var schemaValidationProblemList = js.validate(order, orderSchema); // returns an array of problems

        // Second, the validations through jsonSchema v0.4 Spec doesn't have a solution for "cross-conditional required properties" and we need exactly this, so next are these validations hardcoded

        if (order.signed_for && order.no_signature) {
            schemaValidationProblemList.push('Conflicting Signature Request: Both fields no_signature and signed_for are marked as true. Please make one or both false');
        }

        if (schemaValidationProblemList.length) {
            return schemaValidationProblemList;
        }
        // If no problems, well, no problems
        return 'SUCCESS';

    }







}();