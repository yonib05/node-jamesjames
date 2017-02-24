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

####warehouse.getInventoryStatus( productArray, callback );
