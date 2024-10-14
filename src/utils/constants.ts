import { Address } from "@graphprotocol/graph-ts";

export const BicInformationID = "BicInformation";
export const BicHandleControllerID = "BicHandleController";
export const ETH_ADDRESS = Address.fromHexString("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase());
export const ZERO_ADDRESS = Address.fromHexString("0x0000000000000000000000000000000000000000".toLowerCase());

// Marketplace's selectors
export const CollectAuctionPayoutSelector = "0xebf05a62";
export const CollectAuctionTokensSelector = "0x03a54fe0";
export const HandleBidSelector = "0x0858e5ad";
export const BuyFromListingSelector = "0x704232dc";
export const TransferERC20MessageSelector = "0xe22c4515";

