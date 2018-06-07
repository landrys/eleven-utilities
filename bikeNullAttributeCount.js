'use strict'


/* 
 * TreeOptimizer
 *
 * Will get id, name, and parent name of a tree table
 * and generate full_path_name with left and right nodes.
 *
 */

module.exports = (spec) => {

    let MyConstants = require('./myConstants');

    let {
        host,
        user,
        password,
        db
    } = spec === undefined ? {
        host: MyConstants.HOST,
        user: MyConstants.USER,
        password: MyConstants.PASSWORD,
        db: MyConstants.DB
    } : spec;

    const mysql2 = require('mysql2/promise');

    return {

        async nullCount() {

            const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });

            const [rows, fields] = await connection.execute("select count(*) as bikeNullAttributeCount from item  i join category c on c.id=i.category where c.left_node between 201 and 330 and (attribute1 or attribute2 is null) and description not like '%Request%'");

            let response = 'There are: ' + JSON.stringify(rows[0].bikeNullAttributeCount) + ' bike items with null attributes.';
            return (response);
        },

    }

}
