import React, { useEffect, useState } from "react";
import CustomModal from "../../modal/Modal";
import SelectTokenModal from "../../selectModal/SelectToken";
import { bondingTokens } from "../../../helpers/networks";
import CastleInteraction from "./CastleInteraction/CastleInteraction";
import CastlePlay from "./CastlePlay/CastlePlay";
import coin from "../../../images/coin.svg";
import { allTokens } from "../../../helpers/SwapTokens";
import { useSelector } from "react-redux";
import { useAddress } from "../../../hooks";
import { checkSubscribed } from "../../../helpers/swapRead";
import { useContractContext } from "../../../hooks/contract";

function CastleModal({ show, handleClose }) {
  const [tokenShow, setTokenShow] = useState(false);
  const { assets } = useSelector((state) => state.swapAssets);
  const [state, setState] = useState("");
  const [from, setFrom] = useState(coin);
  const [to, setTo] = useState(coin);
  const [playState, setPlayState] = useState(false);
  const [ignoreToken, setIgnoreToken] = useState();
  const { kingOfDefiV0 } = useContractContext();
  const address = useAddress();

  const { week } = useSelector((state) => state.swapAssets);

  // console.log(assets, "$$$$$$$$");

  const handleModalClose = () => {
    // setPlayState(false);
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

  const handleCheck = async () => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer && week) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      const checkSubscription = await checkSubscribed(
        signedContract,
        week,
        address
      );
      if (checkSubscription) {
        setPlayState(true);
      } else {
        setPlayState(false);
      }
    }
  };

  useEffect(() => {
    handleCheck();
  }, [kingOfDefiV0, week]);

  // useEffect(() => {
  //   setPlayState(false);
  // }, []);

  useEffect(() => {
    if (assets?.length > 19) {
      setFrom(assets[0]);
      setTo(assets[1]);
    }
  }, [assets]);

  // console.log(playState, "tototot");

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
