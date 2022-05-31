import React from "react";

function CastleInteraction(props: any) {
  console.log(props);
  return (
    <form action="">
      <div className="head">
        <h3>The Castle</h3>
        <i className="fa-solid fa-xmark" onClick={props.handleModalClose}></i>
      </div>
      <div className="field">
        <p>From</p>
        <div className="select-dummy">
          <img
            src={props.from?.logoURI ? props.from?.logoURI : props.from}
            alt=""
            onClick={props.handleFromModal}
          />
          <input type="text" />
        </div>
      </div>
      <div className="arrow">
        <i className="fa-solid fa-arrow-down"></i>
      </div>
      <div className="field">
        <p>To</p>
        <div className="select-dummy">
          <img
            src={props.to?.logoURI ? props.to?.logoURI : props.to}
            alt=""
            onClick={props.handleToModal}
          />
          <input type="text" />
        </div>
      </div>
      <button type="submit">Swap</button>
    </form>
  );
}

export default CastleInteraction;
