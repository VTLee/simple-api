import { IEvent, Response, ErrorResponse } from "configurapi";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import UrlEntryManager from "../managers/urlEntryManager";
import IUrlEntry from "../interfaces/iUrlEntry";
import UrlEntry from "../entities/urlEntry";

export async function deleteEntryHandler(event: IEvent, urlEntryManager?: IUrlEntryManager) {
    this.emit(JSON.stringify(event));
    console.log(JSON.stringify(event));
    let shortUrl : string = event.payload['shortUrl'];
    let um : IUrlEntryManager = new UrlEntryManager();
    if (!shortUrl) {
        event.response = new ErrorResponse(`No shortUrl given`, 400);
        return;
    }
    console.log(`Will delete ${shortUrl}`);

    await um.delete(shortUrl);
    event.response = new Response(`Response: ${JSON.stringify(event)}`, 200)
};
