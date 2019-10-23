import UrlEntry from "../entities/urlEntry";
import { NodeNamo } from "nodenamo";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Config from "./config";
import NodenamoUrlEntry from "../repository/providers/decorators/namoUrlEntry";
import UrlEntryNodenamoProvider from "../repository/providers/namoUrlProvider";
import { v4} from "uuid"
import UrlEntryFilter from "../entities/urlEntryFilter";

export async function main() {
    process.env.TABLE_NAME = 'table-name-nn-one'
    let ue = new UrlEntry({owner: 'me'});

    //var nodenamo:NodeNamo = new NodeNamo(new DocumentClient({ region: 'us-east-1' }))
    //await nodenamo.createTable().for(NodenamoUrlEntry).execute().catch((e) => { /*console.log(e.message)*/ }).catch((e) => { console.log(e) });
    //nodenamo = null;
    let nnp:UrlEntryNodenamoProvider = new UrlEntryNodenamoProvider({ region: 'us-east-1'})
    let shortUrl = 'vacr'; //UrlEntry.generateRandomBase32String(5);
    let urlentry : UrlEntry = new UrlEntry({
        id: shortUrl, owner: 'me', target: 'https://virginiacyberrange.org/', enabled: true,
        createdTimestamp: new Date().toISOString(), modifiedTimestamp: new Date().toISOString(),
    })
    
    await nnp.add(urlentry);

    console.log(await nnp.getOne(urlentry.id));
    let filter : UrlEntryFilter = new UrlEntryFilter({owner: urlentry.owner})
    console.log(await nnp.get(filter))
}

main().catch((e) => { console.log(e) });