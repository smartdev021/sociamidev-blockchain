const BACKEND_URL_REMOTE_PROD = 'https://api.soqqle.com';
const BACKEND_URL_REMOTE_STAGING = 'https://stgapi.soqqle.com';

const BACKEND_URL_LOCAL = "http://localhost:3001";

var ConfigMain = {
    getBackendURL: function () {
        if (process.env.dev_env == "local") {
            //front-end will be using remote staging backend, so no need to run local server
            return BACKEND_URL_REMOTE_STAGING;
        }
        else if (process.env.dev_env == "local_backend") {
            return BACKEND_URL_LOCAL;
        }
        else {
            return process.env.NODE_ENV == "staging" ? BACKEND_URL_REMOTE_STAGING : BACKEND_URL_REMOTE_PROD;
        }
    },
    getCookiesExpirationPeriod: function () {
        //10 years
        return (10 * 365 * 24 * 60 * 60 * 1000);
    },

    ChallengesScannerDisabled: false,

    S3BucketURL: 'https://sociamibucket.s3.amazonaws.com'
}


module.exports = ConfigMain;