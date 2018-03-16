const BACKEND_URL_LOCAL = 'http://localhost:3001';
const BACKEND_URL_REMOTE_PROD = 'https://api.soqqle.com';
const BACKEND_URL_REMOTE_STAGING = 'https://stgapi.soqqle.com';

var ConfigMain = {
    getBackendURL : function() {
        if (process.env.dev_env =="local") {
            return BACKEND_URL_LOCAL;
        }
        else {
            return process.env.NODE_ENV == "staging" ? BACKEND_URL_REMOTE_STAGING : BACKEND_URL_REMOTE_PROD;
            // return BACKEND_URL_REMOTE_STAGING;
        }
    },
    getCookiesExpirationPeriod : function() {
        //10 years
        return (10 * 365 * 24 * 60 * 60 * 1000);
    },

    S3BucketURL: 'https://sociamibucket.s3.amazonaws.com'
}


module.exports = ConfigMain;