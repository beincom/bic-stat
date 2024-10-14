import { Address, Bytes } from "@graphprotocol/graph-ts";
import { BicInformation } from "../../generated/schema";
import { SubgraphConfig } from "./chains";

import { BicInformationID } from "./constants";




export function loadBicInformation(subgraphConfig: SubgraphConfig): BicInformation {
    let bicInformation = BicInformation.load(BicInformationID);
    if (bicInformation === null) {
        bicInformation = new BicInformation(BicInformationID);
        bicInformation.name = "Bic Information";
        bicInformation.bicTokens = [];
        // Load addresses
        const bicTokens = subgraphConfig.bicTokens.map<Bytes>((address) => Address.fromHexString(address));        
        bicInformation.bicTokens = bicInformation.bicTokens.concat(bicTokens);

        bicInformation.save();
    }
    return bicInformation;
}