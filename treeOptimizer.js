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
    let fields = []; // Not using this
    let optimizedNodes = [];
    let rootNodes = [];
    let lrCounter = 0;

    const mysql2 = require('mysql2/promise');

    return {

        async test() {
                const connection = await mysql2.createConnection({
                    host: host,
                    user:  user,
                    password: password,
                    database: db
                });
                const [rows, fields] = await connection.execute('select 1');
                console.log('Got it: ' +  JSON.stringify(rows) + '\n' + JSON.stringify(fields) );
        },

        async optimize() {

            lrCounter = 0;

            const connection = await mysql2.createConnection({
                host: host,
                user: user,
                password: password,
                database: db
            });

            [nodes, fields] = await connection.execute('select id,name,parent_id from ' + table);
            //[nodes, fields] = await connection.query('select id,name,parent_id from ? limit 10', table);

            grabRootNodes();

            for (let rootNode of rootNodes) {
                treeBuilder(rootNode);
            }

            return ('Successfully generated all optimizing tree entries.');
        },

        setTreeTable(newTable) {
            table = newTable;
        },

        getOptimizedEntries() {
            return optimizedNodes;
        }

    }

    function treeBuilder(node) {

        node.left_node = ++lrCounter;

        if (node.full_path_name === undefined)
            node.full_path_name = "/" + node.name;
        else
            node.full_path_name = node.full_path_name + "/" + node.name;

        let children = getChildren(node.id);

        if (children.length > 0) {

            let orderedChildren = sortByWithChildrenLast(children);

            for (let child of orderedChildren) {
                child.full_path_name = node.full_path_name;
                treeBuilder(child);
            }
        }

        node.right_node = ++lrCounter;
        optimizedNodes.push(node);
    }

    function getChildren(parentId) {
        let children = nodes.filter((el) => {
            return (el.parent_id === parentId);
        });

        return children;
    }

    function sortByWithChildrenLast(children) {
        let parentChildren = [];
        let children1 = [];
        for (let child of children) {
            let children2 = getChildren(child.id);
            if (children2.length > 0)
                parentChildren.push(child);
            else
                children1.push(child);
        }
        return children1.concat(parentChildren);
    }

    function logIt() {
        //console.log('The Optimized nodes:\n' + JSON.stringify(rootNodes, null, '\t'));
        //console.log('The Optimized nodes:\n' + JSON.stringify(optimizedNodes, null, '\t'));
        //console.log('The nodes:\n' + JSON.stringify(nodes, null, '\t'));
    }

    function grabRootNodes() {
        rootNodes = nodes.filter((el) => {
            return (el.parent_id === null);
        });
    }

}
