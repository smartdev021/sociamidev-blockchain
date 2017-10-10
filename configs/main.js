const BACKEND_URL_LOCAL = 'http://localhost:3001';
const BACKEND_URL_REMOTE_PROD = 'http://13.59.19.153:3000';
const BACKEND_URL_REMOTE_STAGING = 'http://13.59.19.153:8080';

var ConfigMain = {
    BackendURL: BACKEND_URL_REMOTE_PROD,
    S3BucketURL: 'https://sociamibucket.s3.amazonaws.com'
}

module.exports = ConfigMain;