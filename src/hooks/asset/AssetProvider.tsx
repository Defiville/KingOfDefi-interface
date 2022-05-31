import React, { useEffect, useState } from "react";
import { getAssetDescription } from "../../helpers/gameSubmit";
import { allTokens } from "../../helpers/SwapTokens";
import { useContractContext } from "../contract";
import coin from "../../images/coin.svg";
import { useDispatch } from "react-redux";
import { appendAssetList } from "../../state/assets/actions";

type Prop = {
  children: JSX.Element;
};
export default function AssetProvider({ children }: Prop) {
  const dispatch = useDispatch();
  const { chainLinkHub } = useContractContext();
  const [assetList, setAssetList] = useState<any[]>([]);
  const [swapTokenList, setSwapTokenList] = useState([
    {
      index: 0,
      name: "USD",
      decimals: 6,
      logoURI: coin,
    },
  ]);
  const getSwapTokens = async (item: number) => {
    // const getAssetDescription = async (currentToken: UsableContract) => {
    if (chainLinkHub && chainLinkHub.decimal) {
      const asset = await getAssetDescription(chainLinkHub.contract, item);
      if (asset) {
        checkSwapToken(asset, item);
        // const newAssetList = assetList;
        // if (newAssetList.indexOf(item) === -1) newAssetList.push(asset);
        // setAssetList(newAssetList);
      }
    }
    // };
  };

  const checkSwapToken = (asset: string, index: number) => {
    let value = asset.split(" ")[0];
    if (allTokens[value]) {
      // console.log("apple");
      const newSwapList = swapTokenList;
      newSwapList.push({
        ...allTokens[value],
        index: index,
      });
      //   console.log(newSwapList[1], "sssssss");

      setSwapTokenList(newSwapList);
      // console.log(allTokens[value], "valll");
      //   @ts-ignore
      dispatch(appendAssetList(swapTokenList, index));
    }
  };
  //   console.log(swapTokenList, "########");

  useEffect(() => {
    let out = Array.from(Array(20), (_, x) => x);
    chainLinkHub && out.map((item) => getSwapTokens(item + 1));
    //   @ts-ignore
    // dispatch(appendAssetList(swapTokenList, index));
  }, [chainLinkHub]);

  //   useEffect(() => {
  //     swapTokenList &&
  //       //   @ts-ignore
  //   }, [swapTokenList]);

  return <>{children}</>;
}
