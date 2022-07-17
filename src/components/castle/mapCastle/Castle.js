import React, { useState } from "react";
import houseImage from "../../../images/house1x.png";
import CastleModal from "../castleModal/CastleModal";
function Castle() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="house">
        <div onClick={handleShow}>
          <img src={houseImage} alt="" />
        </div>
      </div>
      <CastleModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Castle;
