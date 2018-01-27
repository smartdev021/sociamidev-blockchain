const BACKEND_URL_LOCAL = 'http://localhost:3001';
const BACKEND_URL_REMOTE_PROD = 'http://13.59.19.153:3000';
const BACKEND_URL_REMOTE_STAGING = 'http://13.59.19.153:8080';

var ConfigMain = {
    getBackendURL : function() {
        // if (process.env.dev_env =="local") {
            return BACKEND_URL_LOCAL;
        // }
        // else {
        //     //return process.env.NODE_ENV == "staging" ? BACKEND_URL_REMOTE_STAGING : BACKEND_URL_REMOTE_PROD;
        //     return BACKEND_URL_REMOTE_STAGING;
        // }
    },
    getCookiesExpirationPeriod : function() {
        //10 years
        return (10 * 365 * 24 * 60 * 60 * 1000);
    },

    S3BucketURL: 'https://sociamibucket.s3.amazonaws.com'
}


module.exports = ConfigMain;