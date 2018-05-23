var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let consts = require('./constants');

module.exports = (spec) => {

    let { account, username, code } = spec;

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
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            console.log(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });
}
