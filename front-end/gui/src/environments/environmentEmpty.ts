// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    amplify: {
        Auth: {
            identityPoolId: '',
            region: '', 
            userPoolId: '',
            userPoolWebClientId: '',
            aws_content_delivery: 'enable' // I do not think oyu need this.
        },
        API: {
            endpoints: [
                {
                    name: "",
                    endpoint: "http://localhost:3000/utility"
                }
            ]
        }
    },
    lc: {
        getPart: "?function=lc&verb=GET&apiRequest="
    },
    utils: {
        fullPathNamefunction: "checkTreeTableFullPathName",
        optimizeTreeTablefunction: "optimizeNodes"
    },
    aws: {
        lcproxyApiName: "dev-aws-eleven-utilities",  // TODO: Change this to another API
        utilsApiName: "dev-aws-eleven-utilities" 
    }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
