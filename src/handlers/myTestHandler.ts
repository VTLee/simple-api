import { IEvent, Response } from "configurapi";

export async function myTestHandler(event:IEvent)
{
    this.emit(JSON.stringify(event))
    
    event.response = new Response(`Response: ${JSON.stringify(event)}`, 200)
};
