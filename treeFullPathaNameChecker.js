
module.exports = (spec) => {

    let MyConstants = require('./myConstants');
    let _ = require('lodash');

    let {
        host,
        user,
        password,
        db,
        table
    } = spec === undefined ? {
        host: MyConstants.HOST,
        user: MyConstants.USER,
        password: MyConstants.PASSWORD,
        db: MyConstants.DB,
        table: 'location'
    } : spec;

    let nodes = [];
    const mysql2 = require('mysql2/promise');

    return {
        async check() {
            const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });

            [nodes, fields] = await connection.execute('select * from ' + table);

            let result = _.map(nodes, (entry) => {
                let name = entry.name;
                let fullPathName = entry.full_path_name;
                if (!_.endsWith(fullPathName, name))
                    return entry;
                else
                    return undefined;
            });

            result = _.compact(result);

            return getResponse(result);

        }
    }

    function getResponse(result) {
        let header = '<h3>Nodes with inconsistent full path name => [id:name:full_path_name]</h3><ul>';
        let res;
        for (let bean of result) {
            if (res)
                res = res + '<li>' + bean.id + ':' + bean.name + ':' + bean.full_path_name + '</li>';
            else
                res = '<li>' + bean.id + ':' + bean.name + ':' + bean.full_path_name + '</li>';
        }
        if (res === undefined)
            res = '<li>All Good!</li>';
        return header + res;
    }

}
