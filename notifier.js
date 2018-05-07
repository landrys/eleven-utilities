'use strict';

module.exports  = (spec) => {

    let MyConstants = require('./myConstants'); 

    let func1 = '<li>checkTreeTableFullPathName&treeTable=<ul><li>Checks all nodes full path name for consistency with name of node</li><li><a href="' + MyConstants.HREF_FIRST_PART + '/utility?function=checkTreeTableFullPathName&treeTable=location"' + '>checkTreeTableFullPathName</a></li></ul></li>';

    let func2 = '<li>optimizeNodes&treeTable=&treeTableOptimized=<ul><li>Gets id, name and parent id of the treeTable given and generates left/right nodes and full path name. Stores it all in the treeTableOptimized given.</li><li><a href="' + MyConstants.HREF_FIRST_PART + '/utility?function=optimizeNodes&treeTable=location&treeTableOptimized=location_optimized"' + '>optimizeEntries</a></li></ul>';

    let func3 = '<li>lc&verb=&apiRequest=<ul><li>Calls the LC api with given request in json format</li><li><a href="' + MyConstants.HREF_FIRST_PART + '/utility?function=lc&verb=GET&apiRequest=Employee.json?employeeID=43"' + '>getMySelfFromLC</a></li></ul></li>';

    return {
        availableFunctions() {
            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/html',
                },
                body: '<h3>Available functions via query parameter ?function=[function&arg1...]</h3> <ul>' + func1 + func2 + func3 + '</ul>',

            };
            return response;
        },
        jsonFunctionResponse(info){

            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: info 
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
