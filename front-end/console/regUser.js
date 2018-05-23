var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let consts = require('./constants');

module.exports = (spec) => {

    let {
        account,
        email,
        username,
        password
    } = spec;

    var poolData = (account === undefined) ? {
        UserPoolId: consts.USER_POOL_ID, // Your user pool id here
        ClientId: consts.CLIENT_ID // Your client id here
    } : {
        UserPoolId: consts.LANDRY_USER_POOL_ID, // Your user pool id here
        ClientId: consts.LANDRY_CLIENT_ID // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email
    };

    /*
        var dataPhoneNumber = {
            Name: 'phone_number',
            Value: '+15555555555'
        };
    */

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    //    var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    //   attributeList.push(attributePhoneNumber);

    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            console.log(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}
