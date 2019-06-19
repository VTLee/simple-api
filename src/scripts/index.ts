import { DynamoDB } from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import Config from "../config";
import IUrlEntryProvider from "../interfaces/iUrlEntryProvider";
import UrlEntryProviderFactory from "../repository/providers/urlEntryProviderFactory";
import UrlEntry from "../entities/urlEntry";


async function main() {
    let uep : IUrlEntryProvider = UrlEntryProviderFactory.create("aws");
    uep.add(new UrlEntry("https://www.ldoughty.com"))

}

main().catch((e) => console.log(e));