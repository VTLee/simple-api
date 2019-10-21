import IUrlEntryProvider from "../../interfaces/iUrlEntryProvider";
import Config from "../../config";
import UrlEntryNodenamoProvider from "./namoUrlProvider";

export default class UrlEntryProviderFactory
{
    static create(provider:string = Config.DATA_PROVIDER): IUrlEntryProvider
    {
        if(provider === Config.DATA_PROVIDER_AWS)
        {
            return new UrlEntryNodenamoProvider();
        }
        else if(provider=== Config.DATA_PROVIDER_LOCAL_DYNAMODB){
            return new UrlEntryNodenamoProvider({endpoint: Config.LOCAL_DYNAMODB_ENDPOINT});
        }
        else
        {
            throw new Error(`Unsupported data provider: '${provider}'`);
        }
    }
};
