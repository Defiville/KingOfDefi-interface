import React from "react";

import mapImage from "./images/map.png";

import Assets from "./components/assetBar/Assets";
import Navbar from "./components/navbar/Navbar";

import Castle from "./components/castle/mapCastle/Castle";
import Market from "./components/market/mapMarket/Market";
import { Web3ContextProvider } from "./hooks";

function App() {
  return (
    <Web3ContextProvider>
      <div>
        <Navbar />
        <div className="map_wrap">
          <img src={mapImage} alt="" />
        </div>
        <div className="mid_wrap">
          <div className="mid_wrap_content">
            <Castle />
            <Market />
          </div>
        </div>
        <Assets />
      </div>
    </Web3ContextProvider>
  );
}

export default App;
