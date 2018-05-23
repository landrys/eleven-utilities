var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let consts = require('./constants');
let AWS = require('aws-sdk');

module.exports = (spec) => {

    let {
        username,
        password,
        account
    } = spec;

    var authenticationData = {
        Username: username,
        Password: password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = (account === undefined) ? {
        UserPoolId: consts.USER_POOL_ID, // Your user pool id here
        ClientId: consts.CLIENT_ID // Your client id here
    } : {
        UserPoolId: consts.LANDRY_USER_POOL_ID, // Your user pool id here
        ClientId: consts.LANDRY_CLIENT_ID // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username: username,
        Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            /*Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
            console.log('idToken + ' + result.idToken.jwtToken);

            // FEDERATED IDENTITY
            if (cognitoUser != null) {
                cognitoUser.getSession(function(err, result) {
                    if (result) {
                        console.log('You are now logged in.');
                        // Add the User's Id Token to the Cognito credentials login map.

                        AWS.config.region = consts.AWS_REGION;

                        let cognitoEndPoint = 'cognito-idp.' + consts.AWS_REGION + '.amazonaws.com/' + consts.USER_POOL_ID;
                        let loginsObj = {};
                        loginsObj[cognitoEndPoint] = result.getIdToken().getJwtToken();

                        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                            IdentityPoolId: consts.IDENTITY_POOL_ID,
                            Logins: loginsObj 
                        });
                    } else {
                        console.log(JSON.stringify(err));
                    }
                });
            }
            //call refresh method in order to authenticate user and get new temp credentials
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Successfully logged!');
                }
            });

        },

        onFailure: function(err) {
            //   console.log('FAILED'  + err.message || 'FAILED' + JSON.stringify(err));
            console.log(JSON.stringify(err));
        },

    });

}
