export default class Config
{
    public static AWS_DEFAULT_REGION = 'us-east-1';

    public static DATA_PROVIDER_AWS = 'aws';
    public static DATA_PROVIDER_LOCAL_DYNAMODB = 'local_dynamodb';
    public static DATA_PROVIDER_LIST = [Config.DATA_PROVIDER_AWS, Config.DATA_PROVIDER_LOCAL_DYNAMODB];

    public static DATA_PROVIDER = process.env.LIVE_DATA_PROVIDER || Config.DATA_PROVIDER_AWS;

    // Database
    public static TABLE_NAME = process.env.TABLE_NAME || "table-name-nn-one";
    static readonly LOCAL_DYNAMODB_ENDPOINT = 'http://localhost:8000';

    // Misc
    public static API_REQUEST_TIMEOUT_IN_MS:number = Number(process.env.API_REQUEST_TIMEOUT_IN_MS) || 3000;
    static readonly DYNAMODB_MAX_RETRIES: number = Number(process.env.DYNAMODB_MAX_RETRIES) || 3;
    static readonly DYNAMODB_CONNECT_TIMEOUT_IN_MS: number = Number(process.env.DYNAMODB_CONNECT_TIMEOUT_IN_MS) || 5000;
    static readonly DYNAMODB_SOCKET_TIMEOUT_IN_MS: number = Number(process.env.DYNAMODB_SOCKET_TIMEOUT_IN_MS) || 7000;


};