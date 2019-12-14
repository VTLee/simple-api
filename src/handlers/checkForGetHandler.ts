import { IEvent, Response, ErrorResponse } from "configurapi";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import UrlEntryManager from "../managers/urlEntryManager";

export async function checkForGetHandler(event: IEvent,
    urlEntryManager?: IUrlEntryManager) {
    this.emit(JSON.stringify(event));
    console.log(JSON.stringify(event));
    if (event.request.path.lastIndexOf('/') > 0) {
        return this.continue()
    }
    let target : string = event.request.path.substr(1);
    console.log(`Lookup for ID ${target}`)
    let um : IUrlEntryManager = new UrlEntryManager();
    let result = await um.getOne(target);
    console.log(`Result: ${JSON.stringify(result)}`)
    event.request.method = 'get_v1_test'
    event.request.headers['OVERRIDE_RESPONSE'] = new Response(undefined, 301, { Location: result.target });
    return this.complete()
};

/*
{
    "id": "1ab568e6-362b-4404-a6de-0ce8e626271e",
    "correlationId": "b8aa7d7b-1544-4ad5-8c40-88876c4c9a89",
    "versionRegExp": {},
    "params": {
        "test": ""
    },
    "name": "list_test",
    "request": {
        "method": "get",
        "headers": {
            "host": "simple-api.myntan.com",
            "user-agent": "curl/7.58.0",
            "x-amzn-trace-id": "Root=1-5dacad82-12a6573bf43c9074d3d1aab6",
            "x-forwarded-for": "71.63.60.109",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "params": {},
        "payload": "",
        "query": {},
        "path": "/test",
        "pathAndQuery": "/test"
    },
    "response": {
        "statusCode": 200,
        "body": "",
        "headers": {}
    },
    "payload": "",
    "method": "list"
}
*/