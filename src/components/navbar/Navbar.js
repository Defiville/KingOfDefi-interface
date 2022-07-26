import React from "react";
import WalletConnect from "./WalletConnect";

function Navbar() {
  return (
    <div className="top_nav">
      <div className="nav">
        {/* <div className="coin">
            <img src={coin} alt="" style={{ width: "24px", height: "25px" }} />
            <span> ISLA</span>
          </div>
          <div className="coin">
            <img
              src={walletImage}
              alt=""
              style={{ width: "41px", height: "29px" }}
            />
            <span>
              0xdb…543a <i className="fa-solid fa-xmark"></i>
            </span>
          </div> */}

        <WalletConnect />
      </div>
    </div>
  );
}

export default Navbar;
