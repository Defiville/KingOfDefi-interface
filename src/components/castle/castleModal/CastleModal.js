import React, { useEffect, useState } from "react";
import CustomModal from "../../modal/Modal";
import SelectTokenModal from "../../selectModal/SelectToken";
import { bondingTokens } from "../../../helpers/networks";

function CastleModal({ show, handleClose }) {
  const [tokenShow, setTokenShow] = useState(false);
  const [state, setState] = useState("");
  const [from, setFrom] = useState(bondingTokens[0]);
  const [to, setTo] = useState(bondingTokens[1]);
  const [playState, setPlayState] = useState(false);
  const [ignoreToken, setIgnoreToken] = useState();

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

  console.log(to, "tototot");

  return (
    <>
      <CustomModal show={show} handleClose={handleModalClose}>
        {playState ? (
          <form action="">
            <div className="head">
              <h3>The Castle</h3>
              <i className="fa-solid fa-xmark" onClick={handleModalClose}></i>
            </div>
            <div className="field">
              <p>From</p>
              <div className="select-dummy">
                <img src={from?.logoURI} alt="" onClick={handleFromModal} />
                <input type="text" />
              </div>
            </div>
            <div className="arrow">
              <i className="fa-solid fa-arrow-down"></i>
            </div>
            <div className="field">
              <p>To</p>
              <div className="select-dummy">
                <img src={to?.logoURI} alt="" onClick={handleToModal} />
                <input type="text" />
              </div>
            </div>
            <button type="submit">Swap</button>
          </form>
        ) : (
          <div className="play-modal">
            <div className="title">Play</div>
            <div className="title">King of Defi</div>
            <div className="play-btn" onClick={handlePlay}>
              <i className="fa-solid fa-play"></i>
            </div>
          </div>
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
