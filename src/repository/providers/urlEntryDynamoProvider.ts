// import IUrlEntryProvider from "../../interfaces/iUrlEntryProvider";
// import IUrlEntry from "../../interfaces/iUrlEntry";
// import UrlEntry from "../../entities/urlEntry";
// import { DynamoDB } from 'aws-sdk';
// import Config from "../../config";

// export default class UrlEntryDynamoProvider implements IUrlEntryProvider {

//     private client: DynamoDB.DocumentClient;

//     constructor(config:object = undefined) {
//         this.client = new DynamoDB.DocumentClient({ ...config, region: Config.AWS_DEFAULT_REGION });
//     }

//     async add(entry: IUrlEntry): Promise<void> {
//         console.log(`Add called with ${JSON.stringify(entry)}`)
//         entry.createdTimestamp = new Date().toISOString();
//         entry.modifiedTimestamp = entry.createdTimestamp;
//         entry['id'] = entry.shortUrl;
//         entry['hash'] = entry.shortUrl;
//         delete entry.shortUrl;
//         let item : DynamoDB.DocumentClient.PutItemInputAttributeMap = entry;
//         let params: DynamoDB.DocumentClient.PutItemInput = {
//             TableName: Config.TABLE_NAME,
//             Item: item
//         }
//         return new Promise<void>((resolve, reject) => {
//             this.client.put(params, (error, data) => { UrlEntryDynamoProvider.callback(resolve, reject, error, data); });
//         });
//     }

//     async getByShortUrl(shortUrl: string): Promise<IUrlEntry> {
//         console.log("GetByShortUrl called")

//         let params: DynamoDB.DocumentClient.GetItemInput = {
//             TableName: Config.TABLE_NAME,
//             Key: { hash: shortUrl }
//         };
        
//         return new Promise<IUrlEntry>((resolve, reject) => 
//         {
//             this.client.query(params, (error, data) => UrlEntryDynamoProvider.callback(resolve, reject, error, data));
//         });

//     }

//     async getByOwner(owner: string): Promise<IUrlEntry[]> {
//         console.log("getByOwner called")

//         let params: DynamoDB.DocumentClient.GetItemInput = {
//             TableName: Config.TABLE_NAME,
//             Key: { hash: owner }
//         };
        
//         return new Promise<IUrlEntry[]>((resolve, reject) => 
//         {
//             this.client.query(params, (error, data) => UrlEntryDynamoProvider.callback(resolve, reject, error, data));
//         });
//     }

//     // async update(entry: IUrlEntry): Promise<void> {
//     //     console.log(`update called with ${JSON.stringify(entry)}`)
//     //     entry.modifiedTimestamp = new Date().toISOString();
//     //     let item : DynamoDB.DocumentClient.PutItemInputAttributeMap = entry;
//     //     let params: DynamoDB.DocumentClient.PutItemInput = {
//     //         TableName: Config.TABLE_NAME,
//     //         Item: item
//     //     }
//     //     return new Promise<void>((resolve, reject) => {
//     //         this.client.put(params, (error, data) => { UrlEntryDynamoProvider.callback(resolve, reject, error, data); });
//     //     });
//     // }

//     async delete(shortUrl: string): Promise<void> {
//         let params: DynamoDB.DocumentClient.DeleteItemInput = {
//             TableName: Config.TABLE_NAME,
//             Key: { hash: shortUrl }
//         };
//         return new Promise<void>((resolve, reject) =>
//         {
//             this.client.delete(params, (error, data) => { UrlEntryDynamoProvider.callback(resolve, reject, error, data); });
//         });

//     }

//     static callback(resolve: Function, reject: Function, err, data) {
//         if (err) {
//             return reject(err);
//         }

//         if ('Item' in data) {
//             return resolve(UrlEntry.fromJson(data.Item));
//         }

//         if ('Items' in data) {
//             return resolve(UrlEntryDynamoProvider.itemsToEntries(data.Items));
//         }

//         resolve();
//     }

//     static itemsToEntries(items: any[], enabled?: boolean): IUrlEntry[] {
//         let result: UrlEntry[] = [];

//         for (let item of items) {
//             if (enabled !== undefined) {
//                 let entry = UrlEntry.fromJson(item);

//                 if (enabled === entry.enabled) {
//                     result.push(entry);
//                 }
//             }
//             else {
//                 result.push(UrlEntry.fromJson(item));
//             }
//         }
//         return result;
//     }
// }