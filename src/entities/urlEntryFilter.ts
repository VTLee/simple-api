import { IEvent } from 'configurapi';
import IUrlEntryFilter from '../interfaces/iUrlEntryFilter';

export default class UrlEntryFilter
{

    owner: string;
    shortUrl:string;
    target:string;

    constructor(owner?:string, shortUrl?:string, target?:string )
    {
        this.owner = owner;
        this.shortUrl = shortUrl;
        this.target = target;
    }

    static create(event:IEvent): IUrlEntryFilter
    {
        let getParam = (name) => name in event.params && event.params[name] ? event.params[name] : undefined;

        let owner = getParam('owner');
        let shortUrl = getParam('shortUrl');
        let target = getParam('target');

        return new UrlEntryFilter(owner, shortUrl, target);
    }
};
