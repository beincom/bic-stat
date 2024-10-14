import { dataSource } from '@graphprotocol/graph-ts'

export enum ChainId {
    ARBITRUM_ONE = 42161,
    ARBITRUM_SEPOLIA = 421614,

}

// subgraph does not support string enums, hence these constants
const ARBITRUM_ONE_NETWORK_NAME = 'arbitrum-one'
const ARBITRUM_SEPOLIA_NETWORK_NAME = 'arbitrum-sepolia'
// Note: All addresses should be lowercased!
export class SubgraphConfig {
    bicTokens: string[];
}

export function getSubgraphConfig(): SubgraphConfig {
    // Update this value to the corresponding chain you want to deploy
    const selectedNetwork = dataSource.network()

    // subgraph does not support case switch with strings, hence this if else block
    if (selectedNetwork == ARBITRUM_ONE_NETWORK_NAME) {
        return {
            bicTokens: [
                "0x55501db97a4f85d308b14f8f704e6a56dd61ae36".toLowerCase(),
            ]
        }
    }
    if (selectedNetwork == ARBITRUM_SEPOLIA_NETWORK_NAME) {
        return {
            bicTokens: [
                "0x55501db97a4f85d308b14f8f704e6a56dd61ae36".toLowerCase(),
            ]
        }

    }
    throw new Error('Unsupported Network')
}
