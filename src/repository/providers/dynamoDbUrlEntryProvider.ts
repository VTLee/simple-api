// import { DocumentClient } from "aws-sdk/clients/dynamodb"
// import * as AWS from 'aws-sdk'
// import Config from '../../config';
// import IUrlEntryProvider from "../../interfaces/iUrlEntryProvider";
// import UrlEntry from "../../entities/urlEntry";
// import IUrlEntry from "../../interfaces/iUrlEntry";


// export default class DynamoDbUrlEntryProvider implements IUrlEntryProvider
// {
//     client:DocumentClient;

//     constructor(config:object = {})
//     {
//         // super();
//         this.client = new DocumentClient(Object.assign(config, {region: Config.AWS_DEFAULT_REGION}));;
//     }

//     add(entry: ICatalogEntry): Promise<void> 
//     {
//         if(entry.isGlobal){
//             entry.organizationId = Config.GLOBAL_ORGANIZATION_ID;
//         }
//         let params = {
//             TableName: Config.TABLE_NAME,
//             Item: entry
//         };
        
//         return new Promise<void>((resolve, reject) => 
//         {
//             this.client.put(params, (error, data) => DynamoDbUrlEntryProvider.callback(resolve, reject, error, data));
//         });
//     }

//     async getByShortUrl(shortUrl:string): Promise<IUrlEntry> 
//     {
//         if(!filter){
//             return await this.getAll();
//         }

//         if(!filter.organizationId && !filter.userId){
//             return await this.getAll(filter.enabled);
//         }

//         let [results, globals] = await Promise.all([
//                 this.getByFilter(filter),
//                 (!filter.organizationId && filter.userId)? 
//                 this.getByFilter(new CatalogFilter(filter.enabled,Config.GLOBAL_ORGANIZATION_ID, undefined)): 
//                 []
//         ]);

//         return [...results, ...globals].sort(DeltaConverter.sortByCreatedTimestamp);
//     }


//     private getAll(enabled?:boolean): Promise<IUrlEntry[]>
//     {
//         let params = {
//             TableName: Config.TABLE_NAME
//         };


//         let callback = (resolve, reject, error: AWS.AWSError, data:DocumentClient.ScanOutput) => 
//         {
//             let awsCallback = (error:AWS.AWSError, data:DocumentClient.ScanOutput) => 
//             {
//                 if(error) return reject(error);
                
//                 let result:IUrlEntry[] = [];

//                 if('Items' in data)
//                 {
//                     result = result.concat(DynamoDbUrlEntryProvider.itemsToEntries(data.Items, enabled));

//                     if (data.LastEvaluatedKey === undefined) {
//                         return resolve(result);
//                     } else {
//                         params['ExclusiveStartKey'] = data.LastEvaluatedKey;
//                         this.client.scan(params, awsCallback);
//                     }
//                 } else {
//                     return resolve(result);
//                 }
//             };

//             awsCallback(error, data);
//         }

//         return new Promise<IUrlEntry[]>((resolve, reject) => 
//         {
//             this.client.scan(params, (error, data) => callback(resolve, reject, error, data));
//         });
//     }


//     getOne(id: string): Promise<IUrlEntry> 
//     {
//         let params = {
//             TableName: Config.TABLE_NAME,
//             Key: {id : id}
//         };

//         return new Promise<IUrlEntry>((resolve, reject) => 
//         {
//             this.client.get(params, (error, data) => DynamoDbUrlEntryProvider.callback(resolve, reject, error, data));
//         });
//     }

//     update(entry: IUrlEntry): Promise<void> 
//     {
//         let params = {
//             TableName: Config.TABLE_NAME,
//             Key: {id: entry.id},
//         };
//         return new Promise<void>((resolve, reject) => 
//         {
//             this.client.update(params, (error, data) => DynamoDbUrlEntryProvider.callback(resolve, reject, error, data));
//         });
//     }

//     delete(id: string): Promise<void> 
//     {
//         let params = {
//             TableName: Config.TABLE_NAME,
//             Key: { "id": id }
//         };

//         return new Promise<void>((resolve, reject) =>
//         {
//             this.client.delete(params, (error, data) => DynamoDbUrlEntryProvider.callback(resolve, reject, error, data));
//         });
//     }

//     static callback(resolve: Function, reject: Function, err, data) {
//         if (err) {
//             return reject(err);
//         }

//         if('Item' in data) 
//         {
//             return resolve(UrlEntry.fromJson(data.Item));
//         }
        
//         if('Items' in data) 
//         {
//             return resolve(DynamoDbUrlEntryProvider.itemsToEntries(data.Items));
//         }

//         resolve();
//     }

//     static itemsToEntries(items:any[], enabled?:boolean): IUrlEntry[]
//     {
//         let result:UrlEntry[] = [];
        
//         for(let item of items)
//         {
//             if(enabled !== undefined)
//             {
//                 let entry = UrlEntry.fromJson(item);
            
//                 if(enabled === entry.enabled)
//                 {
//                     result.push(entry);
//                 }
//             }
//             else
//             {
//                 result.push(UrlEntry.fromJson(item));
//             }
//         }
//         return result;
//     }

// };