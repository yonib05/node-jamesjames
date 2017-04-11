Node-SaddleCreek
===================
#### Sixworks/Controlport Rest API Wrapper
This is a Node.js Module will allow you to hook into James & James's Fulfillment API Endpoint this is based on order api specs V 1.13 

----------

Setup
-------

There two way for setting up the warehouse connector:
    
    var warehouse = require('<...>/warehouse')
    warehouse.settings({ ... });


    var warehouse = require('<...>/warehouse').settings({ ... });


The settings object could contain these properties:

    { 
      url: ''https://api.controlport.co.uk/api/1/',
      credentials: {
        api_key: 'xxxxxxxxx'
      },
      debugLogs: false  // Only use it during development 
    }


----------


Methods
-------

####warehouse.createOrder( order, callback );

######**Arguments**
**order**: 
 Accepts {orderObject} and is **required**
 Expected orderObject to be in this form:
 
 ```javascript
var order = {
    "client_ref": "Order1234", //Required  Type:string(32) - Must be Unique
    "po_number": "CustomerPONumber1", //Type:string(32)
    "date_placed": "2013-12-31 23:59:59", //Type:String ISO 8601 date, GMT (+0:00) Default: NOW 
    "postage_speed": 0, // Type:interger Values:[ 0, 1, 2, 3] Default: 2
    "allow_saturday": 0, // Type:bool Default:false
    "signed_for": 0, // Type:bool Default:false
    "no_signature": 0, // Type:bool Default:false
    "tracked": 0, // Type:bool Default:false
    "postage_cost": 3.95, // Type:float
    "total_value": 52.3, // Type:float Default: Sum of line items
    "currency_code": "GBP", //Type:string(3) Default: [inherits channel or account default] Valid: alpha-3 ISO 4217 currency code	
    "tissue_wrap": 0, // Type:bool Default:false
    "days_before_bbe": 0, //Type:integer Default:[account default], else 0
    "hold": 0, // Type:bool Default:false
    "callback_url": "http://yourwebshop.com/callback.script?hash=A1b2C3D4", //Type:string(200) - Must be valid url
    "warehouse_id": 1, //Type:integer Default: null

    "ShippingContact": {
        "name": "David Test", //Required  Type:string(64)
        "company": "Demo Ltd", //Type:string(64)
        "email": "david@demo.co.uk", //Required  Type:string(32) - Must be a vaild email
        "phone": "01234 567 890	", //Required  Type:string(32)
        "address": "1 Road Street", //Required  Type:string(32)
        "address_contd": "off Avenue Lane", //Required  Type:string(32)
        "city": "Teston", //Required  Type:string(32)
        "county": "Exampleshire", //Required  Type:string(32)
        "postcode": "EG1 2EG", //Required  Type:string(16)
        "country": "United Kingdom" //Required  Type:string(32)
    },

    "BillingContact": {
        "name": "Vera Test", //Required  Type:string(64)
        "company": "", //Type:string(64)
        "email": "vera@home.com", //Required  Type:string(32) - Must be a vaild email
        "phone": "01234 567 890	", //Required  Type:string(32)
        "address": "1 Road Street", //Required  Type:string(32)
        "address_contd": "off Avenue Lane", //Required  Type:string(32)
        "city": "Teston", //Required  Type:string(32)
        "county": "Exampleshire", //Required  Type:string(32)
        "postcode": "EG1 2EG", //Required  Type:string(16)
        "country": "United Kingdom" //Required  Type:string(32)
    },
    "items": [{
            "client_ref": "ABC-0001", //Required  Type:string(32)
            "quantity": 3, //Required Type:integer
            "price": 10.99, //Required Type:Float
            "days_before_bbe": 90 // Type:integer Default: order[days_before_bbe]
        },
        {
            "client_ref": "ABC-0002", //Required  Type:string(32)
            "quantity": 1, //Required Type:integer
            "price": 4.5 //Required Type:Float
        }
    ]

};
```
 
**callback ( err, result )**: 
 Accepts only function and is **required**
 Arguments passed: 
 - Error Object or *null* --> Note: Albeit the error object contains validation error info, it is not normalized therefore is not suitable to client side validation, suggested a client side validation
 - Result Object ( an object representing the raw response from the service intended) 
 
 
 
 
 Note: Tests will fail unless you replace with valid apikey and client ref for products