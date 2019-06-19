import IUrlEntryProvider from "../../interfaces/iUrlEntryProvider";
import IUrlEntry from "../../interfaces/iUrlEntry";
import UrlEntry from "../../entities/urlEntry";
import Config from "../../config";
import UrlEntryProvider from "./urlEntryDynamoProvider";

export default class UrlEntryProviderFactory
{
    static create(provider:string = Config.DATA_PROVIDER): IUrlEntryProvider
    {
        if(provider === Config.DATA_PROVIDER_AWS)
        {
            return new UrlEntryProvider();
        }
        else if(provider=== Config.DATA_PROVIDER_LOCAL_DYNAMODB){
            return new UrlEntryProvider({endpoint: Config.LOCAL_DYNAMODB_ENDPOINT});
        }
        else
        {
            throw new Error(`Unsupported data provider: '${provider}'`);
        }
    }
};
