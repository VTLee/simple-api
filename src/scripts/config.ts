export default class Config
{
    static readonly TABLE_NAME = 'table-name-nn-one'
    static readonly DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
};
