import { useCallback } from "react";
import { Contract } from "ethers";
import { evaluateTransaction } from "./evaluateTransaction";
import { submitTransaction } from "./submitTransaction";
import { BigNumber } from "@ethersproject/bignumber";

export const getLeader = async (
  contract: Contract | null,
  gameWeek: number,
) => {
  return await evaluateTransaction(contract, "kings", [gameWeek]);
};

export const getWeek = async (
  contract: Contract | null,
) => {
  return await evaluateTransaction(contract, "gameWeek", []);
};

export const getLeaderUSD = async (
  contract: Contract | null,
  address: string,
) => {
  return await evaluateTransaction(contract, "calculateTotalUSD", [address]);
};

export const stealTheCrown = async (contract: Contract | null,
  account: string
  ) => {
  return await submitTransaction(contract, account, "stealCrown", []);
}


