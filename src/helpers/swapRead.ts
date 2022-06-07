import { useCallback } from "react";
import { Contract } from "ethers";
import { evaluateTransaction } from "./evaluateTransaction";
import { submitTransaction } from "./submitTransaction";
import { BigNumber } from "@ethersproject/bignumber";

export const getNativeBalance = async (
  contract: Contract | null,
  gameWeek: number,
  address: string,
  assetIndex: number
) => {
  console.log(2)
  return await evaluateTransaction(contract, "balances", [gameWeek, address, assetIndex]);
};

export const checkSubscribed = async (
  contract: Contract | null,
  gameWeek: number,
  address: string,
) => {
  console.log(2)
  return await evaluateTransaction(contract, "subscribed", [gameWeek, address]);
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
