'use strict';

exports.elevenUtilitiesHandler = async(event) => {


    let notifier = require('./notifier.js')({});
    let MyConstants = require('./myConstants');

    // This was just for console front end and hack browser front end.
    if (!event.queryStringParameters) {
        return notifier.availableFunctions();
    }

    // FullPathNameChecker
    if (event.queryStringParameters.function.includes('checkTreeTableFullPathName')) {
        try {
            let fpnChecker = require('./treeFullPathaNameChecker')({
                host: MyConstants.HOST,
                user: MyConstants.USER,
                password: MyConstants.PASSWORD,
                db: MyConstants.DB,
                table: event.queryStringParameters.treeTable
            });


            let res = await fpnChecker.check();
            return notifier.functionResponse(res);
        } catch (err) {
            return notifier.functionResponse('Got error before we could finish:<br>' + err);
        }
    }

    // Tree Table Optimizer
    if (event.queryStringParameters.function.includes('optimizeNodes')) {

        let infoForClient;

        let inserter = require('./tableInserter')({
            host: MyConstants.HOST,
            user: MyConstants.USER,
            password: MyConstants.PASSWORD,
            db: MyConstants.DB,
            table: event.queryStringParameters.treeTable

        });


        try {

            // Truncate the table first
            let res = await inserter.emptyTable(event.queryStringParameters.treeTableOptimized);
            infoForClient = infoForClient ? infoForClient + '<br>' + res : res;
        } catch (err) {
            infoForClient = infoForClient ? infoForClient + '<br>' + err : err;
            return notifier.functionResponse('Got error before we could finsh: <br>' + infoForClient);
        }

        try {

            // Generate optimizing entries
            let treeOptimizer = require('./treeOptimizer')({
                host: MyConstants.HOST,
                user: MyConstants.USER,
                password: MyConstants.PASSWORD,
                db: MyConstants.DB,
                table: event.queryStringParameters.treeTable
            });

            let res = await treeOptimizer.optimize();
            infoForClient = infoForClient ? infoForClient + '<br>' + res : res;
            // Write generated entries to new table;
            let res2 = await inserter.write(event.queryStringParameters.treeTableOptimized, treeOptimizer.getOptimizedEntries());
            infoForClient = infoForClient ? infoForClient + '<br>' + res2 : res2;
            return notifier.functionResponse(infoForClient);
        } catch (err) {
            infoForClient = infoForClient ? infoForClient + '<br>' + err : err;
            return notifier.functionResponse('Got error before we could finsh: <br>' + infoForClient);
        }
    }

    // Bike attribute syncer 
    if (event.queryStringParameters.function.includes('bikeItemAttributeSyncer')) {
        try {
            let bikeAttributeSyncer = require('./bikeAttributeSyncer')({
                host: MyConstants.HOST,
                user: MyConstants.USER,
                password: MyConstants.PASSWORD,
                db: MyConstants.DB,
                offset: event.queryStringParameters.offset,
                count: event.queryStringParameters.count
            });

            let res = await bikeAttributeSyncer.sync();
            return notifier.functionResponse(res);
        } catch (err) {
            console.log(err);
            return notifier.functionResponse('Got error before we could finish:<br>' + err);
        }

    }

    // Bike null attribute count 
    if (event.queryStringParameters.function.includes('bikeItemNullAttributeCount')) {
        try {
            let bikeNullAttributeCount = require('./bikeNullAttributeCount')({
                host: MyConstants.HOST,
                user: MyConstants.USER,
                password: MyConstants.PASSWORD,
                db: MyConstants.DB
            });

            let res = await bikeNullAttributeCount.nullCount();
            return notifier.functionResponse(res);
        } catch (err) {
            return notifier.functionResponse('Got error before we could finish:<br>' + err);
        }

    }

 

 

    return notifier.availableFunctions();
};
