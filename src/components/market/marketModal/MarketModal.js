import React, { useState } from "react";
import CustomModal from "../../modal/Modal";
import coin from "../../../images/coin.svg";

function MarketModal({ show, handleClose }) {
  return (
    <CustomModal show={show} handleClose={handleClose}>
      <form action="">
        <div className="head">
          <h3>The Market</h3>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <div className="field">
          <p>From</p>
          <div className="select-dummy">
            <img src={coin} alt="" />
            <input type="text" />
          </div>
        </div>
        <div className="arrow">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
        <div className="field">
          <p>To</p>
          <div className="select-dummy">
            <img src={coin} alt="" />
            <input type="text" />
          </div>
        </div>
        <button type="submit">Swap</button>
      </form>
    </CustomModal>
  );
}

export default MarketModal;
