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
Recommended to use a local Wsdl file, think what would happen if your server restart in a moment when the remote WSDL server is not online. It will never get connected!
One caveat I think on this subject is, if  ProLog company decides to change specification, the local file has no way to know this happened. The remote way is no a total warranty neither as all this connector would fail anyway if they introduce several changes in the future.

----------


Methods
-------

####warehouse.getInventoryStatus( productArray, callback );
