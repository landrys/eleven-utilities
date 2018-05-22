# eleven-utilities
## Architecture
###### Serverless
- offline support for development
- aws
  - Lambda
  - Api Gateway
    - Authorizer
###### Console  - Simple javascript Front End
- Console front end mainly to test authentication and authorization
###### GUI - Angular Front End
- aws-amplify  framework to interact with AWS
- Material Design
###### AWS
- Cognito
- Identiy Pool
- Lambda
  - VPC set up ( see notes in project tab )
- CloudFront
  - Set up static website in an S3 bucket
  - Used aws api to sync GUI-Angular front end.
## Notes
###### Development
  - Change endpoint in environments.ts
  - Change USER and HOST in myConstants for serverless to work offline 
  - constants under front end are for the simple javascript console front end
###### Got Ya's
  - Make sure the VPC is set up correctly in lambda function. This could get overwritten when deploying via serverless. I did not figure out how to set this up via serverless. I did it via AWS console on browser.
