import IUrlEntry from "./iUrlEntry";
import IUrlEntryFilter from "./iUrlEntryFilter";

export default interface IUrlEntryProvider {
    add(entry: IUrlEntry): Promise<void>;
    getOne(id: string): Promise<IUrlEntry>;
    get(filter?: IUrlEntryFilter): Promise<IUrlEntry[]>;
    //update(entry: IUrlEntry): Promise<void>;
    delete(id: string): Promise<void>;
}