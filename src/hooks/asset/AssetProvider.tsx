import React, { useEffect, useState } from "react";
import { getAssetDescription } from "../../helpers/gameSubmit";
import { allTokens } from "../../helpers/SwapTokens";
import { useContractContext } from "../contract";
import coin from "../../images/coin.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  appendAssetList,
  clearAssets,
  myUsdBalance,
} from "../../state/assets/actions";
import { getLastUSDPrice, getNativeBalance } from "../../helpers/swapRead";
import { useAddress } from "../web3";
import { decimalToExact } from "../../helpers/conversion";

type Prop = {
  children: JSX.Element;
};
export default function AssetProvider({ children }: Prop) {
  const dispatch = useDispatch();
  const { chainLinkHub, kingOfDefiV0 } = useContractContext();
  const address = useAddress();
  const [assetList, setAssetList] = useState<any[]>([]);
  //@ts-ignore
  const { assets } = useSelector((state) => state.swapAssets);
  // const [swapTokenList, setSwapTokenList] = useState(assets);

  useEffect(() => {
    getMyUsdBalance();
  }, [address, kingOfDefiV0]);

  // console.log(swapTokenList, "Swap Token List");

  const getMyUsdBalance = async () => {
    if (
      address &&
      kingOfDefiV0 &&
      kingOfDefiV0.contract &&
      kingOfDefiV0.signer
    ) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      // const itemCheck = item - 1;
      const myAssetBalanceBN = await getNativeBalance(
        signedContract,
        2735,
        address,
        0
      );
      const myAssetBalance = decimalToExact(myAssetBalanceBN, 0);
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
      kingOfDefiV0.signer
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
          2735,
          address,
          item
        );
        const myAssetBalance = decimalToExact(myAssetBalanceBN, 0);
        // if (itemCheck == 0) {
        //   const newSwapList = swapTokenList;
        //   // newSwapList[0].myAssetBalance = myAssetBalance;
        //   // newSwapList.splice(0, 1);
        //   setSwapTokenList(newSwapList);
        // }
        //   // console.log(...swapTokenList);
        //   setSwapTokenList(newSwapList);
        // } else if (asset) {
        if (asset) {
          checkSwapToken(asset, item, myAssetBalance);
        }
      }
    }
    // };
  };

  const checkSwapToken = (
    asset: string,
    index: number,
    myAssetBalance: number
  ) => {
    let value = asset?.split(" ")[0];
    if (allTokens[value]) {
      // console.log("apple");
      // const newSwapList = swapTokenList;
      // newSwapList.push({
      //   ...allTokens[value],
      //   index: index,
      //   myAssetBalance: myAssetBalance,
      // });

      const appendToken = {
        ...allTokens[value],
        index: index,
        myAssetBalance: myAssetBalance,
      };

      //   console.log(newSwapList[1], "sssssss");

      // setSwapTokenList(newSwapList);
      // console.log(allTokens[value], "valll");
      //   @ts-ignore
      dispatch(appendAssetList(appendToken));
    }
  };
  //   console.log(swapTokenList, "########");

  const getUsdBalance = () => {};

  useEffect(() => {
    let out = Array.from(Array(20), (_, x) => x);
    address && chainLinkHub && out.map((item) => getSwapTokens(item + 1));
    //   @ts-ignore
    // dispatch(appendAssetList(swapTokenList, index));
  }, [address, chainLinkHub]);

  //   useEffect(() => {
  //     swapTokenList &&
  //       //   @ts-ignore
  //   }, [swapTokenList]);

  return <>{children}</>;
}
