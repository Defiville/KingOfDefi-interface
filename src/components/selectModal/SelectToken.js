import CustomModal from "../modal/Modal";
import coin from "../../images/coin.svg";
import { bondingTokens } from "../../helpers/networks";
import { useEffect, useState } from "react";
import { useContractContext } from "../../hooks/contract";
import { decimalToExact } from "../../helpers/conversion";
import { getAssetDescription } from "../../helpers/gameSubmit";
import { allTokens } from "../../helpers/SwapTokens";
import { useSelector } from "react-redux";
function SelectTokenModal({
  show,
  handleClose,
  handleSelectedToken,
  ignoreToken,
}) {
  const { chainLinkHub } = useContractContext();
  const [assetList, setAssetList] = useState([]);
  const [swapTokenList, setSwapTokenList] = useState([]);
  const { assets } = useSelector((state) => state.swapAssets);

  const handleClick = (token) => {
    handleSelectedToken(token);
    handleClose();
  };

  // const getSwapTokens = async (item) => {
  //   // const getAssetDescription = async (currentToken: UsableContract) => {
  //   if (chainLinkHub && chainLinkHub.decimal) {
  //     const asset = await getAssetDescription(chainLinkHub.contract, item);
  //     if (asset) {
  //       checkSwapToken(asset, item);
  //       const newAssetList = assetList;
  //       if (newAssetList.indexOf(item) === -1) newAssetList.push(asset);
  //       setAssetList(newAssetList);
  //     }
  //   }
  //   // };
  // };

  // const checkSwapToken = (asset, index) => {
  //   let value = asset.split(" ")[0];
  //   if (allTokens[value]) {
  //     // console.log("apple");
  //     const newSwapList = swapTokenList;
  //     newSwapList.push({
  //       ...allTokens[value],
  //       index: index,
  //     });
  //     console.log(newSwapList[1], "sssssss");
  //     setSwapTokenList(newSwapList);
  //   }
  // };
  // console.log(swapTokenList, "########");

  // useEffect(() => {
  //   let out = Array.from(Array(20), (_, x) => x);
  //   out.map((item) => getSwapTokens(item + 1));
  // }, [chainLinkHub]);

  return (
    <CustomModal show={show} handleClose={handleClose}>
      <div className="select_token_modal">
        <form action="">
          <div className="head">
            <h3>Select Token</h3>
            <i className="fa-solid fa-xmark" onClick={handleClose}></i>
          </div>
          <ul className="token-list">
            {assets
              ?.filter((item) => item?.name != ignoreToken)
              ?.map((token, index) => (
                <li onClick={() => handleClick(token)} key={index}>
                  <img src={token.logoURI} alt="" />
                  <span>{token?.name}</span>
                </li>
              ))}
          </ul>
        </form>
      </div>
    </CustomModal>
  );
}

export default SelectTokenModal;
