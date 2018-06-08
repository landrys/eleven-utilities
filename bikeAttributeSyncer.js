'use strict'


/* 
 * 
 * BikeAttritbuteSyncer
 * Will get all bike items with null attibutes and sync them to 
 * eleven DB from LC using lc-web API
 *
 */

module.exports = (spec) => {

    let MyConstants = require('./myConstants');
    let req = require('./lcWebRequest')({});
    let _ = require('lodash');

    let {
        host,
        user,
        password,
        db,
        offset,
        count 
    } = spec === undefined ? {
        host: MyConstants.HOST,
        user: MyConstants.USER,
        password: MyConstants.PASSWORD,
        db: MyConstants.DB,
        offset: 0,
        count: 1 
    } : spec;

    let nodes = [];
    let fields = []; // Not using this
    let optimizedNodes = [];
    let rootNodes = [];
    let lrCounter = 0;

    const mysql2 = require('mysql2/promise');

    return {

        async test() {
                const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });
            const [rows, fields] = await connection.execute("select i.id, description from item  i join category c on c.id=i.category where c.left_node between 201 and 330 and (attribute1 or attribute2 is null) and description not like '%Request%'");
        },

        async sync() {

            if (!count)
                count = 1;
            if (!offset)
                offset = 0;

            const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });

            const [rows, fields] = await connection.execute("select i.id, description from item  i join category c on c.id=i.category where c.left_node between 201 and 330 and (attribute1 or attribute2 is null) and description not like '%Request%'  and (lc_deleted is null or lc_deleted is false) order by i.id limit 100000000 offset " + offset);
            

            let chunkedArray = _.chunk(rows, 100);
            let info = [];

            for (let chunk of chunkedArray) {
                let res = await req.put("lc211/sync/Item/with-ids/" + getIdsAsCsv(chunk));

                if (res.data)
                    info.push(res.data);
                else
                    info.push({
                        "crap": "Data is empty. Hmmm.."
                    });

                if (--count === 0) {
                    break;
                } else {
                    console.log("Sleeping a second before sending next request...");
                    await sleep(1000);
                }
            };

            let response = 'Successfully called sync bikes with null attributes from LC. Here is 11nator\'s response => ' + JSON.stringify(info, null, '\t');

            console.log(response);
            return (response);
        },

    }

    function getIdsAsCsv( rows ) {

        let csv = '';
        rows.forEach( (bean) => {
            csv += bean.id 
            csv += ",";
        }); 

        return csv.slice(0,-1);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
