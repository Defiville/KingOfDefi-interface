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

export const getLeaderUSD = async (
  contract: Contract | null,
  address: string,
) => {
  return await evaluateTransaction(contract, "calculateTotalUSD", [address]);
};