'use strict';

module.exports = (spec) => {

    let request = require('request-promise');
    let MyConstants = require('./myConstants.js');
    let querystring = require('querystring');

    let _include_headers = function(body, response, resolveWithFullResponse) {
          return {'headers': response.headers, 'data': body};
    };

    let options = {
        auth: {
            'user': 'fpiergen@landrys.com',
            'pass': 'FAB'
        },
        method: 'GET',
        uri: MyConstants.LC_WEB_API_URL,
        //resolveWithFullResponse: true,
        transform: _include_headers,
        headers: {
            'Content-Type': 'application/json'
        },
        json: true // Automatically parses the JSON string in the response
    };

    return {

        // TODO
        async get(apiRequest) {
            options.method = 'GET';
            options.uri = MyConstants.LC_WEB_API_URL + apiRequest;
            return doRequest();
        },

        async put(apiRequest, data) {
            options.method = 'PUT';
            options.uri = MyConstants.LC_WEB_API_URL + apiRequest;
            if (data)
                options.form = JSON.stringify(data);
            return doRequest();
        },


    }

    async function doRequest() {

        try {
            let data = await request(options);
            //console.log(JSON.stringify(data, null, '\t'));
            return data;
        } catch (err) {
            throw ('Error on request to lc-web API: ' + err);
        }

    }

}
