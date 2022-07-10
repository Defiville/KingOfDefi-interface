import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNativeBalance } from "../../../helpers/swapRead";
import { useAddress } from "../../../hooks";
import { useContractContext } from "../../../hooks/contract";
import { useChainId } from "../../../hooks/web3/web3Context";
import coin from "../../images/coin.svg";
import { useTransactionAdder } from "../../../state/transactions/hooks";
import { useAppDispatch } from "../../../store/hooks";
import { decimalToExact } from "../../../helpers/conversion";

function Assets() {
  //   @ts-ignore
  const { loading, assets } = useSelector((state) => state.swapAssets);
  const chainId = useChainId();

  // const { kingOfDefiV0 } = useContractContext();
  const address = useAddress();
  // const dispatch = useAppDispatch();
  // const chainId = useChainId();
  // const transactionAdder = useTransactionAdder();
  // const [myAssets, setMyAssets] = useState([]);

  // const getAssetValue = async (index: number) => {
  //   // const getAssetDescription = async (currentToken: UsableContract) => {
  //   if (
  //     assets &&
  //     kingOfDefiV0 &&
  //     kingOfDefiV0.decimal &&
  //     kingOfDefiV0.contract &&
  //     kingOfDefiV0.signer
  //   ) {
  //     console.log(index);
  //     const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
  //     const asset = await getNativeBalance(signedContract, address, index);
  //     const assetBalance = decimalToExact(asset, kingOfDefiV0.decimal);
  //     let newAsset = myAssets;
  //     //   @ts-ignore
  //     newAsset.push({ ...assets[index], assetBalance });
  //     setMyAssets(newAsset);
  //   }
  //   // };
  // };

  // useEffect(() => {
  //   assets?.length > 19 &&
  //     assets?.map((item: any) => getAssetValue(item.index));
  // }, [assets]);

  const priceDisplay = () => {};

  return (
    // <div className="container-fluid">
    <div className="slider_wrap">
      <h4>My Assets</h4>
      <div className="slider_hub">
        {chainId === 137 ? (
          <>
            {loading || assets?.length < 1 ? (
              <>
                {address ? "Loading.." : "Connect wallet to view your assets"}
              </>
            ) : (
              <>
                {assets?.length > 1 &&
                  assets
                    ?.filter((item: any) => item?.myAssetBalance)
                    .map((item: any, index: number) => (
                      <div className="currency" key={index}>
                        <div className="cur_img">
                          <img src={item?.logoURI} alt="" />
                        </div>
                        <div className="cur_content">
                          <span>
                            {item?.myAssetBalance.toFixed(2)} {item?.name}
                          </span>
                          <p>
                            $
                            {item?.myUSDBalance
                              ? item?.myUSDBalance.toFixed(2)
                              : item?.myAssetBalance}
                          </p>
                        </div>
                      </div>
                    ))}
                {assets?.length > 1 &&
                  assets
                    ?.filter((item: any) => item?.myAssetBalance === 0)
                    .map((item: any, index: number) => (
                      <div className="currency" key={index}>
                        <div className="cur_img">
                          <img src={item?.logoURI} alt="" />
                        </div>
                        <div className="cur_content">
                          <span>
                            {item?.myAssetBalance.toFixed(2)} {item?.name}
                          </span>
                          <p>
                            $
                            {item?.myUSDBalance
                              ? item?.myUSDBalance.toFixed(2)
                              : item?.myAssetBalance}
                          </p>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </>
        ) : (
          <>{"Please switch to Polygon Mainnet."}</>
        )}
      </div>
    </div>
    // </div>
  );
}

export default Assets;
