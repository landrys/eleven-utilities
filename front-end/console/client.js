let consts = require('./constants');
let fetch = require('node-fetch');

module.exports = (spec) => {

    let {
        username,
        password,
        account
    } = spec;

    let auth = require('./authenticatePoolOnly')({
        username: username,
        password: password,
        account: account
    });

    return {
        async get(apiRequest) {

            let idToken = await auth.getIdToken(); //.then((data)=>{ console.log(data)});
            if (apiRequest === undefined)
                apiRequest = 'Employee.json?employeeID=43';

            let URL = consts.AWS_API_GATEWAY_URL + '?function=lc&verb=GET&apiRequest=' + apiRequest;

            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            };

            options.headers.Authorization = idToken;

            fetch(URL, options).then(function(response) {

                console.log(response.headers);

                response.json().then((data) => {
                    console.log(JSON.stringify(data));
                });

            }, function(error) {

                console.log('ERROR!') //=> String
                console.log(error.message) //=> String

            })
        }
    }
}
