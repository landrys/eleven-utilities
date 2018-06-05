'use strict';

module.exports = (spec) => {

    let accessToken = 'notPopulatedOnFirstInstantiation';
    let request = require('request-promise');
    let tokenRefresher = require('./tokenRefresher')();
    let MyConstants = require('./myConstants.js');
    let bucketLevel = 0; // lets start off assuming it is empty!
    let querystring = require('querystring');

    let _include_headers = function(body, response, resolveWithFullResponse) {
          return {'headers': response.headers, 'data': body};
    };

    let options = {
        method: 'GET',
        uri: MyConstants.LC_API_URL,
        //resolveWithFullResponse: true,
        transform: _include_headers,
        headers: {
            'Authorization': 'OAuth ' + accessToken,
            'Content-Type': 'application/json'
        },
        json: true // Automatically parses the JSON string in the response
    };

    return {

        async get(apiRequest) {
            let result = decodeURIComponent(apiRequest);
            let myArray = result.split("?");
            options.method = 'GET';
            options.uri = MyConstants.LC_API_URL + myArray[0];
            options.qs = querystring.parse(myArray[1]);
            return doRequest();
        },

        async put(apiRequest, data) {
            options.method = 'PUT';
            options.uri = MyConstants.LC_API_URL + apiRequest;
            options.form = JSON.stringify(data);
            return doRequest();
        }

    }

    async function doRequest() {

        // Rough  limiter....
        console.log('BUCKET LEVEL: ' + bucketLevel);
        console.log('options: ' + JSON.stringify(options));
        if ( bucketLevel > MyConstants.LC_MAX_BUCKET_LEVEL )
            await sleep(11000);

        try {
            let data = await request(options);
            // console.log(JSON.stringify(data, null, '\t'));
            let bucket = data.headers["x-ls-api-bucket-level"];
            bucketLevel = bucket.split('/')[0]/bucket.split('/')[1];
            return data;
        } catch (err) {

            accessToken = await tokenRefresher.refresh();

            try {
                options.headers.Authorization = 'OAuth ' + accessToken;
                let data = await request(options);
                //console.log('We are good!\n' + JSON.stringify(data["@attributes"]));
                return data;
            } catch (err) {
                throw ('Error after refreshing: ' + err);
            }
        }

    }

    function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
    }

}
