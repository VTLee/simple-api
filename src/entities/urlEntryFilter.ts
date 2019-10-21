import { IEvent } from 'configurapi';
import IUrlEntryFilter from '../interfaces/iUrlEntryFilter';

export default class UrlEntryFilter {

    id: string;
    shortUrl: string;
    owner: string;

    constructor({
        id,
        shortUrl,
        owner
    }: { id?: string, shortUrl?: string, owner?: string } = {}) {
        this.id = id;
        this.shortUrl = shortUrl;
        this.owner = owner;
    }

    static create(event: IEvent): IUrlEntryFilter {
        let getParam = (name) => name in event.params && event.params[name] ? event.params[name] : undefined;

        let id = getParam('id');
        let shortUrl = getParam('shortUrl');
        let owner = getParam('owner');

        return new UrlEntryFilter({id, shortUrl, owner});
    }
};
