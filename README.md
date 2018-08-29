# Introduction
This is a React/Redux based chat web application.  It uses AWS Amplify to connect to an AppSync GraphQL implementation

# Installation
* Clone this repository
* Install the chat-backend in your AWS account.
* Configure /src/config.js with the resource identifiers from the chat-backend Installation

    identityPoolId: '',
    region: 'us-west-2',
    userPoolId: '',
    appClient: '',
    appSyncEndpoint: ''
* yarn install
* yarn run build
* aws s3 sync ./build/ s3://<your website bucket>
