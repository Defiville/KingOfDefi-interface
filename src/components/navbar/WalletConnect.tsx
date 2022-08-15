import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWeb3Context } from "../../hooks";
import coin from "../../images/coin.svg";
import rules from "../../images/rules.svg";
import walletImage from "../../images/wallet.svg";
import LeaderboardModal from "../LeaderboardModal";
import RuleModal from "../RulesModal";

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

  //Rules Modal

  const [show, setShow] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLeaderboard = () => setLeaderboard(!leaderboard);

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
          <div className="coin" onClick={handleShow}>
            <img
              src={rules}
              alt=""
              style={{ width: "24px", height: "25px" }}
              onClick={handleShow}
            />
            <span> Rules</span>
          </div>
          <RuleModal show={show} handleClose={handleClose} />

          <div className="coin" onClick={handleLeaderboard}>
            <img
              src={rules}
              alt=""
              style={{ width: "24px", height: "25px" }}
              onClick={handleLeaderboard}
            />
            <span> Leaderboard</span>
          </div>
          <LeaderboardModal
            show={leaderboard}
            handleClose={handleLeaderboard}
          />
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
