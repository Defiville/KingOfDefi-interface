import { useCallback } from "react";
import { Contract } from "ethers";
import { evaluateTransaction } from "./evaluateTransaction";
import { submitTransaction } from "./submitTransaction";
import { BigNumber } from "@ethersproject/bignumber";

export const getNativeBalance = async (
  contract: Contract | null,
  address: string,
  assetIndex: number
) => {
  return await evaluateTransaction(contract, "balances", [address, assetIndex]);
};


export const getUSDForAmount = async (
  contract: Contract | null,
  assetIndex: number,
  amount: number,
) => {
  return await evaluateTransaction(contract, "getUSDForAmount", [assetIndex, amount]);
};

export const getLastUSDPrice = async (
  contract: Contract | null,
  assetIndex: number,
) => {
  return await evaluateTransaction(contract, "getLastUSDPrice", [assetIndex]);
};
