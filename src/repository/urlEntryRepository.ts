import IUrlEntry from "../interfaces/iUrlEntry";
import IUrlEntryRepostiry from "../interfaces/iUrlEntryRepository";
import UrlEntry from "../entities/urlEntry";
import IUrlEntryProvider from "../interfaces/iUrlEntryProvider";
import UrlEntryProviderFactory from "./providers/urlEntryProviderFactory";

export default class UrlEntryRepository implements IUrlEntryRepostiry {
    provider:IUrlEntryProvider;

    constructor(provider: IUrlEntryProvider = UrlEntryProviderFactory.create()) {
        this.provider = provider;
    }

    async add(entry: IUrlEntry): Promise<void> {
        console.log("Add called")
        
        return await this.provider.add(entry);
    }

    async getByShortUrl(shortUrl: string): Promise<IUrlEntry> {
        console.log("GetByShortUrl called")
        return await this.provider.getByShortUrl(shortUrl);
    }

    async getByOwner(owner: string): Promise<IUrlEntry[]> {
        console.log("GetByOwner called")
        return await this.provider.getByOwner(owner);
    }
    // async update(updatedEntry: IUrlEntry): Promise<void> {
    //     return;
    // }
    async delete(shortUrl: string): Promise<void> {
        return await this.provider.delete(shortUrl);
    }

}
