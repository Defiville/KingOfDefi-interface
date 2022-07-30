import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWeb3Context } from "../../hooks";
import coin from "../../images/coin.svg";
import walletImage from "../../images/wallet.svg";

const WalletConnect = () => {
  const {
    connect,
    disconnect,
    connected,
    address,
    providerChainID,
    checkWrongNetwork,
    hasCachedProvider,
  } = useWeb3Context();

  const [isConnected, setConnected] = useState(connected);

  //@ts-ignore

  const { usdBalance } = useSelector((state) => state.swapAssets);

  let buttonText = "Connect Wallet";
  let clickFunc: any = connect;

  if (isConnected) {
    buttonText =
      address.substr(0, 6) + "..." + address.substr(address.length - 4);
    clickFunc = () => {};
  }

  if (isConnected && providerChainID !== 137) {
    buttonText = "Wrong Network";
    clickFunc = () => {
      checkWrongNetwork();
    };
  }

  useEffect(() => {
    if (hasCachedProvider()) {
      connect();
    }
  }, []);

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  return (
    <>
      {isConnected && buttonText !== "Wrong Network" && (
        <>
          <div className="coin">
            <img src={coin} alt="" style={{ width: "24px", height: "25px" }} />
            <span> ISLA</span>
          </div>
          <div className="coin">
            <img src={coin} alt="" style={{ width: "24px", height: "25px" }} />
            <span> V-USD: ${usdBalance}</span>
          </div>
          <div className="coin">
            <img
              src={walletImage}
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <span onClick={disconnect}>
              {buttonText} <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
        </>
      )}
      {!isConnected && (
        <button onClick={clickFunc} className="connect-btn">
          <div>Connect Wallet</div>
        </button>
      )}
      {isConnected && buttonText === "Wrong Network" && (
        <>
          {/* <div className="coin">
            <img src={coin} alt="" style={{ width: "24px", height: "25px" }} />
            <span> ISLA</span>
          </div> */}
          <div className="coin">
            {/* <img
              src={walletImage}
              alt=""
              style={{ width: "30px", height: "30px" }}
            /> */}
            <span onClick={clickFunc}>
              {buttonText} <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default WalletConnect;
