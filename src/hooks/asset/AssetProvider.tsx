import React, { useEffect, useState } from "react";
import { getAssetDescription } from "../../helpers/gameSubmit";
import { allTokens } from "../../helpers/SwapTokens";
import { useContractContext } from "../contract";
import coin from "../../images/coin.svg";
import { useDispatch } from "react-redux";
import { appendAssetList, clearAssets } from "../../state/assets/actions";
import { getNativeBalance } from "../../helpers/swapRead";
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
  const [swapTokenList, setSwapTokenList] = useState([
    {
      index: 0,
      name: "USD",
      decimals: 6,
      logoURI: coin,
      myAssetBalance: 0,
    },
  ]);
  const getSwapTokens = async (item: number) => {
    // const getAssetDescription = async (currentToken: UsableContract) => {
    if (
      chainLinkHub &&
      chainLinkHub.decimal &&
      kingOfDefiV0 &&
      kingOfDefiV0.decimal &&
      kingOfDefiV0.contract &&
      kingOfDefiV0.signer
    ) {
      const asset = await getAssetDescription(chainLinkHub.contract, item);
      //   const bal = await
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      const myAssetBalanceBN = await getNativeBalance(
        signedContract,
        address,
        item
      );
      const myAssetBalance = decimalToExact(
        myAssetBalanceBN,
        kingOfDefiV0.decimal
      );
      if (asset) {
        checkSwapToken(asset, item, myAssetBalance);
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
      const newSwapList = swapTokenList;
      newSwapList.push({
        ...allTokens[value],
        index: index,
        myAssetBalance: myAssetBalance,
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
    if (!address) {
      //   @ts-ignore
      dispatch(clearAssets());
    }
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
