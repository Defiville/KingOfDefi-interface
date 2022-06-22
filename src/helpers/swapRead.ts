import { useCallback } from "react";
import { Contract } from "ethers";
import { evaluateTransaction } from "./evaluateTransaction";
import { submitTransaction } from "./submitTransaction";
import { BigNumber } from "@ethersproject/bignumber";


//Get Native Balance of each token
export const getNativeBalance = async (
  contract: Contract | null,
  gameWeek: number,
  address: string,
  assetIndex: number
) => {
  return await evaluateTransaction(contract, "balances", [gameWeek, address, assetIndex]);
};

//Get User Tokens in USD
export const getBalanceInUSD = async (
  contract: Contract | null,
  address: string,
  assetIndex: number
) => {
  return await evaluateTransaction(contract, "balanceOfInUSD", [address, assetIndex]);
};

//Get User Total Asset Balance in USD
export const getTotalUSD = async (
  contract: Contract | null,
  address: string,
) => {
  return await evaluateTransaction(contract, "calculateTotalUSD", [address]);
};


// Check User Subscription for Game Week
export const checkSubscribed = async (
  contract: Contract | null,
  gameWeek: number,
  address: string,
) => {
  return await evaluateTransaction(contract, "subscribed", [gameWeek, address]);
};

//Get the USD of the input bAlance Tokens in USD
export const getUSDForAmount = async (
  contract: Contract | null,
  assetIndex: number,
  amount: BigNumber | number,
) => {
  return await evaluateTransaction(contract, "getUSDForAmount", [assetIndex, amount]);
};

//Get the Last USD Price of Each Token
export const getLastUSDPrice = async (
  contract: Contract | null,
  assetIndex: number,
) => {
  return await evaluateTransaction(contract, "getLastUSDPrice", [assetIndex]);
};
