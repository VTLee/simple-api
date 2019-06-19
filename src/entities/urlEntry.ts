import * as uuid from 'uuid/v4';
import IUrlEntry from '../interfaces/iUrlEntry';
import * as base32 from 'base32';
var crypto = require('crypto');

export default class UrlEntry implements IUrlEntry {
    shortUrl: string;
    createdTimestamp: string;
    modifiedTimestamp: string;
    enabled: boolean;
    target: string;
    owner: string;

    constructor(target: string, owner: string = "undefined", shortUrl: string = UrlEntry.generateRandomBase32String(8), enabled: boolean = true) {
        this.target = target;
        this.owner = owner;
        this.shortUrl = shortUrl;
        this.enabled = enabled;
    }

    static fromJson(obj: object): IUrlEntry {
        if (obj === undefined) return undefined;

        let result = Object.assign(new IUrlEntry(), obj);

        return result;
    }

    private static generateRandomBase32String(codeLength: number) {
        let base32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let code: string = "";
        let nowInMs = (new Date()).getTime();
        for (let i = 0; i < codeLength; i++) {
            code += base32.charAt(Math.floor(Math.floor(Math.random() * nowInMs) % 32));
        }
        return code.toLowerCase();
    }

};

// async function main() {
//     let ue = new UrlEntry(undefined, 'me');
//     console.log(`${JSON.stringify(ue.shortUrl)}`);

// }

// main().then(() => console.log("done")).catch((e) => console.log(e));