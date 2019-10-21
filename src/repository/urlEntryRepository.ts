import IUrlEntry from "../interfaces/iUrlEntry";
import IUrlEntryRepostiry from "../interfaces/iUrlEntryRepository";
import UrlEntry from "../entities/urlEntry";
import IUrlEntryProvider from "../interfaces/iUrlEntryProvider";
import UrlEntryProviderFactory from "./providers/urlEntryProviderFactory";
import IUrlEntryFilter from "../interfaces/iUrlEntryFilter";

export default class UrlEntryRepository implements IUrlEntryRepostiry {
    provider:IUrlEntryProvider;

    constructor(provider: IUrlEntryProvider = UrlEntryProviderFactory.create()) {
        this.provider = provider;
    }

    async add(entry: IUrlEntry): Promise<void> {
        console.log("Add called")
        
        return await this.provider.add(entry);
    }

    async get(filter: IUrlEntryFilter): Promise<IUrlEntry[]> {
        console.log("get called")
        return await this.provider.get(filter);
    }

    async getOne(id: string): Promise<IUrlEntry> {
        console.log("GetOne called")
        return await this.provider.getOne(id);
    }

    // async update(updatedEntry: IUrlEntry): Promise<void> {
    //     return;
    // }
    
    async delete(shortUrl: string): Promise<void> {
        return await this.provider.delete(shortUrl);
    }

}
