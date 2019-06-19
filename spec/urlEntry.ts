import { assert as assert } from 'chai';
import {Mock, It} from "typemoq";
import UrlEntry from '../src/entities/urlEntry';
import urlEntry from '../src/entities/urlEntry';

describe('CatalogManager', async () =>
{
    it('id', async () =>
    {
        let ue = new UrlEntry("theTarget");
        
        assert.isTrue(ue.target.length > 0);
        assert.isTrue(ue.shortUrl.length > 0);
    });
    
    it('fromJson', async () =>
    {
        let dt : string = new Date().toISOString();
        let json : object = {
            "shortUrl":"abcde",
            "createdTimestamp":dt,
            "modifiedTimestamp":dt,
            "enabled": true,
            "target":"theTarget",
            "owner":"test"
        }

        let ue = urlEntry.fromJson(json);
        assert.isTrue(ue.owner === "test");
        assert.isTrue(ue.createdTimestamp === dt);
        assert.isTrue(ue.modifiedTimestamp === dt);
        assert.isTrue(ue.shortUrl === "abcde");
        assert.isTrue(ue.target === "theTarget");
        assert.isTrue(ue.enabled === true);
    });
});