import { useCallback } from "react";
import { Contract } from "ethers";
import { evaluateTransaction } from "./evaluateTransaction";
import { submitTransaction } from "./submitTransaction";
import { BigNumber } from "@ethersproject/bignumber";

// export const subscribeToGame = (): ((
//   contract: Contract | null,
//   account: string,
//   spender: string,
//   amount: number | BigNumber
// ) => any) => {
//   return useCallback(async (contract: Contract | null, account: string, spender: string, amount: number | BigNumber) => {
//     return await submitTransaction(contract, account, "play", [spender]);
//   }, []);
// };

export const subscribeToGames = async (contract: Contract | null,
    account: string,
    spender: string,
    ) => {
    return await submitTransaction(contract, account, "play", []);
}

export const getAssetDescription = async (contract: Contract | null,
    assetIndex: number,
    ) => {
    return await evaluateTransaction(contract, "assetDescription", [assetIndex]);
}

// export const getTreasuryTba = (): ((contract: Contract | null) => any) => {
//     return useCallback(async (contract: Contract | null) => {
//       return await evaluateTransaction(contract, "getTBA", []);
//     }, []);
//   };

