import { IEvent } from "configurapi";

export async function onErrorHandler(event:IEvent)
{
    return this.continue()
};
