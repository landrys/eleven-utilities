'use strict';

exports.handler = async(event) => {

    let notifier = require('./notifier.js')({});

    const table = event.pathParameters.table;
    const data = JSON.parse(event.body);
    const id = data.id;
    const allData = {data,"id": id, "Table" : table};
    //return notifier.jsonFunctionResponse(JSON.stringify(allData, null, '\t'));
    //
    let MyConstants = require('./myConstants');

    try {

        let res;
        let req = require('./lcRequest')({});
        let query = table + "/" + id + ".json";
        res = await req.put(query, data);
        return notifier.jsonFunctionResponse(JSON.stringify(res, null, '\t'));

    } catch (err) {
        return notifier.jsonFunctionResponse(JSON.stringify(err, null, '\t'));
    }
}
