import React from "react";

import mapImage from "./images/map.png";

import Navbar from "./components/navbar/Navbar";

import Castle from "./components/castle/mapCastle/Castle";
import Market from "./components/market/mapMarket/Market";
import { Web3ContextProvider } from "./hooks";
import { ContractContextProvider } from "./hooks/contract";
import { Provider } from "react-redux";
import store from "./store/store";
import AssetProvider from "./hooks/asset/AssetProvider";
import Assets from "./components/assetBar/Asset/Assets";
import { ToastContainer } from "react-toastify";
import { client } from "./hooks/graphql/apollo";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <Web3ContextProvider>
      <ContractContextProvider>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AssetProvider>
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
                <ToastContainer />
              </div>
            </AssetProvider>
          </ApolloProvider>
        </Provider>
      </ContractContextProvider>
    </Web3ContextProvider>
  );
}

export default App;
