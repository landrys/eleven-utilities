'use strict';

module.exports = (spec) => {

    /*
     *
     * Got clientId and clientSecret by registering the client via LC web page
     * https://developers.lightspeedhq.com/retail/authentication/authentication-overview 
     * where there is a link that brings you to a registration page
     *        https://cloud.lightspeedapp.com/oauth/register.php
     * I put the id/secret in myConstants.js
     * 
     */

    let MyConstants = require('./myConstants');
    let request = require('request-promise');


    /*
     *
     *  After waiting 24 hours or so need to get the temporary code to get an access token. The
     *  code expires in 30 seconds. So in a browser put in the following URL
     *
     *          https://cloud.lightspeedapp.com/oauth/authorize.php?response_type=code&client_id=xxxxx&scope=employee:all
     *
     *  grab the code given then within 30 seconds submit the following curl request,
     *
     *          curl -F 'client_id=xxxxx' -F 'client_secret=xxxx' -F 'code=<theCodeGottenAbove>' -F 'grant_type=authorization_code' -F 'redirect_uri=https://localhost' https://cloud.lightspeedapp.com/oauth/access_token.php
     *
     *   This is what we got with first call. Use it and refresh it as required.
     *
     *  I put the refresh token in myConstants.js
     *
     *  Can do all above programtically using Oath2 JS but since you only have to do it once I decide to just do it manually.
     *
     */

    return {
        async refresh() {
            let options = {
                method: 'POST',
                uri: MyConstants.LC_TOKEN_REFRESH_ENDPOINT,
                // This is the form input whch sets the header accordingly
                // can also use body input Read up on POST shit.
                form: {
                    client_id: MyConstants.LC_CLIENT_ID,
                    client_secret: MyConstants.LC_CLIENT_SECRET,
                    grant_type: 'refresh_token',
                    refresh_token: MyConstants.LC_REFRESH_TOKEN
                },
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                },
                json: true // Automatically parses the JSON string in the response
            };

            try {
                console.log('Refreshing....');
                let data = await request(options);
                let accessToken = data.access_token;
                return accessToken;
            } catch (err) {
                throw ('Error trying to refresh: ' + err);
            }
        }
    }

}
