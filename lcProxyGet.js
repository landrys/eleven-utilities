'use strict';

exports.handler = async(event) => {


    let notifier = require('./notifier.js')({});
    let MyConstants = require('./myConstants');

    try {

        let res;
        let req = require('./lcRequest')({});
        res = await req.get(event.queryStringParameters.lcQuery);
        return notifier.jsonFunctionResponse(JSON.stringify(res, null, '\t'));

    } catch (err) {
        return notifier.jsonFunctionResponse(JSON.stringify(err, null, '\t'));
    }
}
