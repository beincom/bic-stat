import { ethereum } from "@graphprotocol/graph-ts";

import { TransactionUserOp } from "../../generated/schema";

export function loadTransactionUserOp(event: ethereum.Event): TransactionUserOp {
    let userOpEvent = TransactionUserOp.load(event.transaction.hash);
    if (userOpEvent === null) {
        userOpEvent = new TransactionUserOp(event.transaction.hash);
        userOpEvent.feesByBic = [];
        userOpEvent.feesByETH = [];
    }
    userOpEvent.blockNumber = event.block.number;
    userOpEvent.blockTimestamp = event.block.timestamp;
    userOpEvent.transactionHash = event.transaction.hash;

    userOpEvent.save();
    return userOpEvent
  }