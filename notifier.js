'use strict';

module.exports  = (spec) => {

    let MyConstants = require('./myConstants'); 
    return {
        availableFunctions() {
            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/html',
                },
                body: '<h3>Available functions via query parameter ?function=[function&arg1...]</h3> <ul><li>checkTreeTableFullPathName&treeTable=<ul><li>Checks all nodes full path name for consistency with name of node</li><li><a href="' + MyConstants.URL_HEADER + '/utility?function=checkTreeTableFullPathName&treeTable=location"' + '>checkTreeTableFullPathName</a></li></ul></li><li>optimizeNodes&treeTable=&treeTableOptimized=<ul><li>Gets id, name and parent id of the treeTable given and generates left/right nodes and full path name. Stores it all in the treeTableOptimized given.</li><li><a href="' + MyConstants.URL_HEADER + '/utility?function=optimizeNodes&treeTable=location&treeTableOptimized=location_optimized"' + '>optimizeEntries</a></li></ul></ul>',
            };
            return response;
        },
        functionResponse(info){

            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/html',
                },
                body: '<h3>' + info + '</h3>',
            };
            return response;
        },
        test(info){
            console.log(info);
        }
    }

}
