export default class Config
{
    public static DATA_PROVIDER_AWS = 'aws';
    public static DATA_PROVIDER_LOCAL_DYNAMODB = 'local_dynamodb';
    public static DATA_PROVIDER_LIST = [Config.DATA_PROVIDER_AWS, Config.DATA_PROVIDER_LOCAL_DYNAMODB];

    public static DATA_PROVIDER = process.env.AUTHENTICATION_API_DATA_PROVIDER || Config.DATA_PROVIDER_LOCAL_DYNAMODB;

    // Database
    public static DATABASE_PREFIX = process.env.AUTHENTICATION_API_DATABASE_PREFIX || 'vacr';
    public static TABLE_NAME_IDENTITIES = Config.DATABASE_PREFIX + (process.env.TABLE_NAME_IDENTITIES || '-identities');
    static readonly LOCAL_DYNAMODB_ENDPOINT = process.env.AUTHENTICATION_API_LOCAL_DYNAMODB_ENDPOINT || 'http://localhost:8000';

    // User API
    public static USER_API_BASE_URL:string = process.env.USER_API_BASE_URL || 'http://localhost:8083';
    public static ENTITLEMENT_API_BASE_URL:string = process.env.ENTITLEMENT_API_BASE_URL || 'http://localhost:8082';

    // AWS Congnito
    public static AWS_DEFAULT_REGION = process.env.AUTHN_API_AWS_DEFAULT_REGION || 'us-east-1';
    public static AWS_POOL_ID = process.env.AUTHN_API_COGNITO_FEDERATED_POOL_ID;

    // JWT
    public static JWT_EXPIRES_IN_HOURS = process.env.AUTHN_API_JWT_EXPIRES_IN_HOURS || '1';
    public static JWT_MAX_REFRESH_IN_HOURS = process.env.AUTHN_API_JWT_MAX_REFRESH_IN_HOURS || '6';
    public static JWT_SECRET = process.env.AUTHN_API_JWT_SECRET || 'for-testing-only-6xegCEQd8NrnXzUWsX9Ez2wAZxN5YRtK'
    public static JWT_ALGORITHM = process.env.AUTHN_API_JWT_ALGORITHM || 'HS256';

    // AWS
    public static AAD_REPLY_URL = process.env.AUTHN_API_AAD_REPLY_URL || 'http://localhost:8081/adal';
    public static AAD_REPLY_URLS:string[] = process.env.AUTHN_API_AAD_REPLY_URLS ? process.env.AUTHN_API_AAD_REPLY_URLS.split(',') : [Config.AAD_REPLY_URL];
    public static AAD_CLIENT_ID = process.env.AUTHN_API_AAD_CLIENT_ID || 'ad834083-4a16-475e-916d-5422aa1c617f';
    public static AAD_CLIENT_SECRET = process.env.AUTHN_API_APP_CLIENT_SECRET;

    // Misc
    static API_REQUEST_TIMEOUT_IN_MS:number = Number(process.env.API_REQUEST_TIMEOUT_IN_MS) || 3000;

    public static readonly AUTHENTICATION_API_SERVICE_TOKEN = process.env.AUTHENTICATION_API_SERVICE_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdXRoZW50aWNhdGlvbi1hcGkiLCJwcm92aWRlciI6ImJhc2ljIiwiZGlzcGxheU5hbWUiOiJhdXRoZW50aWNhdGlvbi1hcGkiLCJyZXNvdXJjZXMiOltdLCJub3RBZnRlciI6MTU5MzU2MTYwMCwiZXhwIjoxNTkzNTYxNjAwLCJpYXQiOjE1OTM1NjE2MDAsImlzcyI6ImN5YmVyLXJhbmdlciIsImp0aSI6ImFhNmRiN2U5LTU5OTktNGYyMi04MTk4LWQyMzA1MGQyM2QyMCJ9.noiIO2ajnaj5u4QaL1r6yHT3zSeGL3AIGr-dGtFG2Y4';
};