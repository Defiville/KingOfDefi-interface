import React, { useEffect, useState } from "react";
import CustomModal from "../../modal/Modal";
import SelectTokenModal from "../../selectModal/SelectToken";
import { bondingTokens } from "../../../helpers/networks";
import CastleInteraction from "./CastleInteraction/CastleInteraction";
import CastlePlay from "./CastlePlay/CastlePlay";
import coin from "../../../images/coin.svg";
import { allTokens } from "../../../helpers/SwapTokens";
import { useSelector } from "react-redux";

function CastleModal({ show, handleClose }) {
  const [tokenShow, setTokenShow] = useState(false);
  const { assets } = useSelector((state) => state.swapAssets);
  const [state, setState] = useState("");
  const [from, setFrom] = useState(coin);
  const [to, setTo] = useState(coin);
  const [playState, setPlayState] = useState(false);
  const [ignoreToken, setIgnoreToken] = useState();

  console.log(assets, "$$$$$$$$");

  const handleModalClose = () => {
    setPlayState(false);
    handleClose();
  };
  const handleSelectedToken = (token) => {
    if (state === "from") {
      setFrom(token);
    } else if (state === "to") {
      setTo(token);
    }
  };

  const handleTokenClose = () => {
    setTokenShow(false);
  };
  const handleTokenOpen = () => {
    setTokenShow(true);
  };
  const handleFromModal = () => {
    setIgnoreToken(to?.name || "");
    setState("from");
    handleTokenOpen();
  };

  const handleToModal = () => {
    setState("to");
    setIgnoreToken(from?.name || "");
    handleTokenOpen();
  };

  const handlePlay = () => {
    setPlayState(true);
  };

  useEffect(() => {
    setPlayState(false);
  }, []);

  // useEffect(() => {
  //   if (assets?.length > 0) {
  //     setFrom(assets[0]);
  //     setTo(assets[1]);
  //   }
  // }, [assets]);

  console.log(playState, "tototot");

  return (
    <>
      <CustomModal show={show} handleClose={handleModalClose}>
        {playState ? (
          <CastleInteraction
            handleModalClose={() => handleModalClose()}
            handleFromModal={() => handleFromModal()}
            handleToModal={() => handleToModal()}
            from={from}
            to={to}
            handleSelectedToken={() => handleSelectedToken}
            handleTokenClose={() => handleTokenClose}
            handleTokenOpen={() => handleTokenOpen}
          />
        ) : (
          <CastlePlay handlePlay={() => handlePlay()} />
        )}
      </CustomModal>
      <SelectTokenModal
        ignoreToken={ignoreToken}
        show={tokenShow}
        handleClose={handleTokenClose}
        handleSelectedToken={handleSelectedToken}
      />
    </>
  );
}

export default CastleModal;
