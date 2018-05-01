'use strict'


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
        db: MyConstants.DB,
    } : spec;

    const mysql2 = require('mysql2/promise');

    return {

        async emptyTable (table) {
            const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });


            await connection.execute('truncate ' + table);
            return 'Truncated table : ' + table;
        },

        async write(table, rows) {

            const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });

            await connection.execute('set foreign_key_checks=0');

            for (let entry of rows) {
                await connection.query('insert into ' + table + ' set ?', entry);
            }

            await connection.execute('set foreign_key_checks=1');
            return 'Successfully wrote all nodes to table: ' + table;
        }
    }
}

