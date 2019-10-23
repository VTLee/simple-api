import { IEvent } from "configurapi";

export async function onErrorHandler(event:IEvent)
{
    if (event.request.headers['OVERRIDE_RESPONSE'])
        event.response = event.request.headers['OVERRIDE_RESPONSE'];
    return this.continue()
};
