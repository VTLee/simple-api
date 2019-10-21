import IUrlEntry from './iUrlEntry'

interface IUrlEntryManager {
    add(urlEntry: IUrlEntry): Promise<void>;
    get(id: string): Promise<IUrlEntry>;
    getByShortUrl(shortUrl: string): Promise<IUrlEntry>;
    getByOwner(ownerId: string): Promise<IUrlEntry[]>;
    delete(shortUrl: string): Promise<void>;
};

export default IUrlEntryManager;
