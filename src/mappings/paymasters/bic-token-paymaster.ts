import {
  ChargeFee as ChargeFeeEvent,
} from "../../../generated/BicTokenPaymaster/BicTokenPaymaster"
import {
  ChargeFee,
} from "../../../generated/schema"
import { getSubgraphConfig, loadBicInformation } from "../../utils"

export function handleChargeFee(event: ChargeFeeEvent): void {
  const subgraphConfig = getSubgraphConfig()
  const bicInformation = loadBicInformation(subgraphConfig)

  if (!bicInformation.bicTokens.includes(event.address)) {
    return;
  }

  let entity = new ChargeFee(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity._fee = event.params._fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}