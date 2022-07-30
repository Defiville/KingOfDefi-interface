import React, { useState } from "react";
import MarketModal from "../marketModal/LeaderBoard/MarketModal";
import marketImage from "../../../images/market.png";
import Counter from "../../Counter";

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
        <div className="counter-market">
          <Counter />
        </div>
      </div>

      <MarketModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Market;
