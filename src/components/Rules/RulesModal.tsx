import React, { useEffect, useState } from "react";
import CustomModal from "../modal/Modal";

function RulesModal() {
  return (
    <CustomModal show={show} handleClose={handleClose}>
      <form action="">
        <div className="head">
          <h3>The King's Crown</h3>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <div className="play-modal">
          <div className="title">
            
          </div>
          <div className="address-leader">Address</div>
          

          <div className="address-leader">USD Amount</div>
          <span></span>
          <div className="address-leader">Total Players</div>
          <span></span>
        </div>
        
      </form>
    </CustomModal>
  );
}

export default RulesModal;
