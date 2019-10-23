import { IEvent } from 'configurapi';
import IUrlEntryFilter from '../interfaces/iUrlEntryFilter';

export default class UrlEntryFilter {

    id: string;
    owner: string;

    constructor({
        id,
        owner
    }: { id?: string, owner?: string } = {}) {
        this.id = id;
        this.owner = owner;
    }

    static create(event: IEvent): IUrlEntryFilter {
        let getParam = (name) => name in event.params && event.params[name] ? event.params[name] : undefined;

        let id = getParam('id');
        let owner = getParam('owner');

        return new UrlEntryFilter({id, owner});
    }
};
