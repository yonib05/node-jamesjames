/**
 * Created by yoni on 2/24/17.
 */
var should = require('should');

var warehouse = require('../lib/warehouse').settings({
    url: 'https://api.controlport.co.uk/api/1/',
    credentials: {
        api_key: '3cac28674ca5c525af980b3cd92e9245' /* use your own api key this is a dummy and will fail the test */
    },
    allow_preorder: false,
    update_stock: false,
    test: true,
    debugLogs: true  // Only use it during development or testing
});

var sampleOrder = {
    "client_ref": "Order" + Math.floor(Math.random() * 9999999),
    "po_number": "CustomerPONumber1",
    "date_placed": "2017-04-11T23:04:57+00:00",
    "postage_speed": 0,
    "allow_saturday": false,
    "signed_for": false,
    "no_signature": true,
    "tracked": true,
    "postage_cost": 3.95,
    "total_value": 52.3,
    "currency_code": "GBP",
    "tissue_wrap": false,
    "days_before_bbe": 0,
    "hold": false,
    "callback_url": "http://yourwebshop.com/callback.script?hash=A1b2C3D4",
    "warehouse_id": 1,

    "ShippingContact": {
        "name": "David Test",
        "company": "Demo Ltd",
        "email": "david@demo.co.uk",
        "phone": "01234 567 890",
        "address": "1 Road Street",
        "address_contd": "off Avenue Lane",
        "city": "Teston",
        "county": "Exampleshire",
        "postcode": "EG1 2EG",
        "country": "United Kingdom"
    },

    "BillingContact": {
        "name": "Vera Test",
        "company": "",
        "email": "vera@home.com",
        "phone": "01234 567 890",
        "address": "1 Road Street",
        "address_contd": "off Avenue Lane",
        "city": "Teston",
        "county": "Exampleshire",
        "postcode": "EG1 2EG",
        "country": "United Kingdom"
    },
    "items": [{
        "client_ref": "ABC-0001", /* use your own client ref this is a dummy and will fail the test */
        "quantity": 3,
        "price": 10.99,
        "days_before_bbe": 90
    }, {
        "client_ref": "ABC-0002",
        "quantity": 1,
        "price": 4.5
    }]

};


describe('Warehouse.createOrder', function () {

    //create One Order products
    describe('#arguments(sampleOrder1, callback)', function () {
        it('should return success message or error message that order has been created', function (done) {
            warehouse.createOrder(sampleOrder, function (err, results) {
                if (err) return done(err);
                else {
                    try {
                        results.success.should.be.instanceof(Number).and.eql(1);
                        return done(); // if the assertion passes, the done will be called
                    } catch (err2) { // here we catch an error which assertion throws when it fails
                        return done(err2); // we need to call done(err2) to finish the test which failed
                    }

                }

            })

        });
    });


});
