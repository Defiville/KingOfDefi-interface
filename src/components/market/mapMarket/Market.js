import React, { useState } from "react";
import MarketModal from "../marketModal/LeaderBoard/MarketModal";
import marketImage from "../../../images/market.png";

function Market() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="market">
        <div onClick={handleShow}>
          <img src={marketImage} alt="" />
        </div>
      </div>

      <MarketModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Market;
