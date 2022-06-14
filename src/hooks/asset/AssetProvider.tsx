import React, { useEffect } from "react";
import { getAssetDescription } from "../../helpers/gameSubmit";
import { allTokens } from "../../helpers/SwapTokens";
import { useContractContext } from "../contract";
import { useDispatch, useSelector } from "react-redux";
import {
  appendAssetList,
  getBalanceOfUser,
  getNumberWeek,
  myUsdBalance,
} from "../../state/assets/actions";
import {
  getBalanceInUSD,
  getNativeBalance,
  getTotalUSD,
} from "../../helpers/swapRead";
import { useAddress } from "../web3";
import { decimalToExact } from "../../helpers/conversion";
import { useChainId } from "../web3/web3Context";
import { getWeek } from "../../helpers/leaderboard";

type Prop = {
  children: JSX.Element;
};
export default function AssetProvider({ children }: Prop) {
  const dispatch = useDispatch();
  const { chainLinkHub, kingOfDefiV0 } = useContractContext();
  const chainId = useChainId();
  const address = useAddress();
  //@ts-ignore
  const { week } = useSelector((state) => state.swapAssets);

  useEffect(() => {
    chainId === 137 && getMyUsdBalance();
    chainId === 137 && getCurrentWeek();
    chainId === 137 && getAssetInUSD();
  }, [chainId, address, kingOfDefiV0, week]);

  // console.log(swapTokenList, "Swap Token List");

  const getAssetInUSD = async () => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      const totalBalance = await getTotalUSD(signedContract, address);
      const totalBalanceDb = decimalToExact(totalBalance, 18);
      // @ts-ignore
      dispatch(getBalanceOfUser(totalBalanceDb));
    }
  };

  const getCurrentWeek = async () => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      const currentWeek = await getWeek(signedContract);
      const currentWeekDb = decimalToExact(currentWeek, 0);
      // @ts-ignore
      dispatch(getNumberWeek(currentWeekDb));
    }
  };

  const getMyUsdBalance = async () => {
    if (
      address &&
      kingOfDefiV0 &&
      kingOfDefiV0.contract &&
      kingOfDefiV0.signer &&
      week
    ) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      const myAssetBalanceBN = await getNativeBalance(
        signedContract,
        week,
        address,
        0
      );
      const myAssetBalance = decimalToExact(myAssetBalanceBN, 18);
      // @ts-ignore
      dispatch(myUsdBalance(myAssetBalance));
    }
  };

  const getSwapTokens = async (item: number) => {
    // const getAssetDescription = async (currentToken: UsableContract) => {
    if (
      chainLinkHub &&
      chainLinkHub.decimal &&
      chainLinkHub.contract &&
      kingOfDefiV0 &&
      kingOfDefiV0.decimal &&
      kingOfDefiV0.contract &&
      kingOfDefiV0.signer &&
      week
    ) {
      const asset = await getAssetDescription(chainLinkHub.contract, item);
      //   const bal = await
      if (item && address && asset && kingOfDefiV0.decimal) {
        const signedContract = kingOfDefiV0.contract.connect(
          kingOfDefiV0.signer
        );
        // const itemCheck = item - 1;
        const myAssetBalanceBN = await getNativeBalance(
          signedContract,
          week,
          address,
          item
        );
        const myAssetInUSD = await getBalanceInUSD(
          signedContract,
          address,
          item
        );
        const myUSDBalance = decimalToExact(myAssetInUSD, 18);
        const myAssetBalance = decimalToExact(myAssetBalanceBN, 18);

        if (asset) {
          checkSwapToken(asset, item, myAssetBalance, myUSDBalance);
        }
      }
    }
    // };
  };

  const checkSwapToken = (
    asset: string,
    index: number,
    myAssetBalance: number,
    myUSDBalance: number
  ) => {
    let value = asset?.split(" ")[0];
    if (allTokens[value]) {
      const appendToken = {
        ...allTokens[value],
        index: index,
        myAssetBalance: myAssetBalance,
        myUSDBalance: myUSDBalance,
      };

      //   @ts-ignore
      dispatch(appendAssetList(appendToken));
    }
  };

  useEffect(() => {
    let out = Array.from(Array(20), (_, x) => x);
    chainId === 137 &&
      address &&
      chainLinkHub &&
      out.map((item) => getSwapTokens(item + 1));
  }, [chainId, address, chainLinkHub, week]);

  return <>{children}</>;
}
