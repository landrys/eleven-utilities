var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let consts = require('./constants');
let AWS = require('aws-sdk');

module.exports = (spec) => {

    let {
        username,
        password,
        account
    } = spec;

    let idToken;

    let authenticationData = {
        Username: username,
        Password: password,
    };

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    let poolData = (account === undefined) ? {
        UserPoolId: consts.USER_POOL_ID, // Your user pool id here
        ClientId: consts.CLIENT_ID // Your client id here
    } : {
        UserPoolId: consts.LANDRY_USER_POOL_ID, // Your user pool id here
        ClientId: consts.LANDRY_CLIENT_ID // Your client id here
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let userData = {
        Username: username,
        Pool: userPool
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


    return {
        getIdToken() {
            let currentUser = userPool.getCurrentUser();
            if (currentUser === null) {
                return new Promise(function(resolve, reject) {
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function(result) {
                            idToken = result.idToken.jwtToken;
                            resolve(idToken);
                        },
                        onFailure: function(err) {
                            //   console.log('FAILED'  + err.message || 'FAILED' + JSON.stringify(err));
                            console.log(JSON.stringify(err));
                            reject(err);
                        },

                    });
                });
            } else {
                return new Promise(function(resolve, reject) {
                    currentUser.getSession(function(err, session) {
                        if (err) {
                            reject(err);
                        }

                        console.log('session validity: ' + session.isValid());
//console.log(session.getRefreshToken());

                        if (session.isValid())
                            resolve(idToken);
                    });
                });
            }
        }
    }

/*
refresh_token = session.getRefreshToken(); // receive session from calling cognitoUser.getSession()
    if (AWS.config.credentials.needsRefresh()) {
      cognitoUser.refreshSession(refresh_token, (err, session) => {
        if(err) {
          console.log(err);
        } 
        else {
          AWS.config.credentials.params.Logins['cognito-idp.<YOUR-REGION>.amazonaws.com/<YOUR_USER_POOL_ID>']  = session.getIdToken().getJwtToken();
          AWS.config.credentials.refresh((err)=> {
            if(err)  {
              console.log(err);
            }
            else{
              console.log("TOKEN SUCCESSFULLY UPDATED");
            }
          });
        }
      });
    }
*/

/*
function setIdToken( idToken1 ) {
                        console.log('setting... ');
idToken = idToken1;
}
*/
}
