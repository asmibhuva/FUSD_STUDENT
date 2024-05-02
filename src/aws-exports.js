export const REGION = process.env.REACT_APP_REGION;

export const AWSConfig = {
  aws_project_region: REGION,
  aws_user_pools_id: process.env.REACT_APP_USERPOOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_APP_CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
};


export const AWSAppSyncConfig = {
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_ENDPOINT,
  aws_appsync_region: REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};

export const COGNITODOMAIN = process.env.REACT_APP_DOMAIN;
export const MS_SAML = process.env.REACT_APP_MS_SAML;

export const HOSTURL = process.env.REACT_APP_REDIRECT_URI
// export const HOSTURL = "http://localhost:3000/"

export const AUDIO_FILE_BUCKET = process.env.REACT_APP_AUDIO_FILE_BUCKET



/*
----------
TESTING
*/

// const region = 'us-east-1';


// export const AWSConfig = {
//   aws_project_region: region,
//   aws_user_pools_id: 'us-east-1_kgTcJwN2I',
//   aws_user_pools_web_client_id: '5klivf8s3oe2bdmrvqbs7a1gu9',
//   authenticationFlowType: 'USER_PASSWORD_AUTH',
// };


// export const AWSAppSyncConfig = {
//   aws_appsync_graphqlEndpoint:
//     'https://n4misjw2h5gkvatlcglj7xygo4.appsync-api.us-east-1.amazonaws.com/graphql',
//   aws_appsync_region: region,
//   aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
// };