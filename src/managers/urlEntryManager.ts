import IUrlEntryRepostiry from "../interfaces/iUrlEntryRepository";
import UrlEntryProviderFactory from "../repository/providers/urlEntryProviderFactory";
import UrlEntryRepository from "../repository/urlEntryRepository";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import IUrlEntry from "../interfaces/iUrlEntry";

export default class UrlEntryManager implements IUrlEntryManager
{
    private repository;

    constructor(repository:IUrlEntryRepostiry = new UrlEntryRepository(UrlEntryProviderFactory.create()))
    {
        this.repository = repository;
    }
    
    async add(urlEntry: IUrlEntry): Promise<void> {
        return await this.repository.add(urlEntry);
    }
    async getByShortUrl(shortUrl: string): Promise<IUrlEntry> {
        return await this.repository.getByShortUrl(shortUrl);
    }
    async getByOwner(ownerId: string): Promise<IUrlEntry[]> {
        return await this.repository.getByOwner(ownerId);
    }
    async delete(shortUrl: string): Promise<void> {
        return await this.repository.delete(shortUrl);
    }
}