import {
  Deposited as DepositedEvent,
  UserOperationEvent as UserOperationEventEvent,
} from "../../../generated/EntryPoint/EntryPoint"
import {
  Deposited,
  UserOperationEvent,
} from "../../../generated/schema"
import { getSubgraphConfig, loadBicInformation } from "../../utils"

export function handleDeposited(event: DepositedEvent): void {
  const subgraphConfig = getSubgraphConfig()
  const bicInformation = loadBicInformation(subgraphConfig)


  if (!bicInformation.bicTokens.includes(event.params.account)) {
    return;
  }

  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.totalDeposit = event.params.totalDeposit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserOperationEvent(event: UserOperationEventEvent): void {
  const subgraphConfig = getSubgraphConfig()
  const bicInformation = loadBicInformation(subgraphConfig)

  if (!bicInformation.bicTokens.includes(event.params.paymaster)) {
    return;
  }

  let entity = new UserOperationEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userOpHash = event.params.userOpHash
  entity.sender = event.params.sender
  entity.paymaster = event.params.paymaster
  entity.nonce = event.params.nonce
  entity.success = event.params.success
  entity.actualGasCost = event.params.actualGasCost
  entity.actualGasUsed = event.params.actualGasUsed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}