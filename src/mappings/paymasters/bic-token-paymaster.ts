import {
  ChargeFee as ChargeFeeEvent,
} from "../../../generated/BicTokenPaymaster/BicTokenPaymaster"
import {
  ChargeFee,
} from "../../../generated/schema"
import { getSubgraphConfig, loadBicInformation, loadTransactionUserOp } from "../../utils"

export function handleChargeFee(event: ChargeFeeEvent): void {
  const subgraphConfig = getSubgraphConfig()
  const bicInformation = loadBicInformation(subgraphConfig)

  if (!bicInformation.bicTokens.includes(event.address)) {
    return;
  }

  let txUserOp = loadTransactionUserOp(event)
  txUserOp.feesByBic = txUserOp.feesByBic.concat([event.params._fee])

  // NOTE(Ted): Dont save more record to optimize cost
  // let entity = new ChargeFee(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.sender = event.params.sender
  // entity.fee = event.params._fee

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
  txUserOp.save()
}