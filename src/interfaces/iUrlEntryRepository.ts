import IUrlEntry from "./iUrlEntry";

export default interface IUrlEntryRepostiry {
    add(entry: IUrlEntry): Promise<void>;
    getByShortUrl(shortUrl: string): Promise<IUrlEntry>;
    getByOwner(ownerId: string): Promise<IUrlEntry[]>;
    delete(shortUrl: string): Promise<void>;
}