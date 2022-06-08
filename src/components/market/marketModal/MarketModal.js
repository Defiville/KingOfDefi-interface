import React, { useEffect, useState } from "react";
import CustomModal from "../../modal/Modal";
import coin from "../../../images/coin.svg";
import crown from "../../../images/crown.svg";
import { getLeader, getLeaderUSD } from "../../../helpers/leaderboard";
import { useContractContext } from "../../../hooks/contract";
import { decimalToExact } from "../../../helpers/conversion";

function MarketModal({ show, handleClose }) {
  const { kingOfDefiV0 } = useContractContext();
  const [gameLeader, setGameLeader] = useState();
  const [gameLeaderUSD, setGameLeaderUSD] = useState();

  const leaderboardFetch = async () => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      if (signedContract) {
        const leader = await getLeader(signedContract, 2735);
        setGameLeader(
          leader.substr(0, 6) + "..." + leader.substr(leader.length - 4)
        );
        checkUSDBalance(leader, signedContract);
      }
    }
  };

  const checkUSDBalance = async (leader, signedContract) => {
    const leaderUSD = await getLeaderUSD(signedContract, leader);
    const decimalLeaderUSD = decimalToExact(leaderUSD, 0);
    setGameLeaderUSD(decimalLeaderUSD);
  };

  console.log(gameLeaderUSD);
  useEffect(() => {
    leaderboardFetch();
  }, [kingOfDefiV0]);

  return (
    <CustomModal show={show} handleClose={handleClose}>
      <form action="">
        <div className="head">
          <h3>The King's Crown</h3>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <div className="play-modal">
          {/* <div className="title">Play</div>
          <div className="title">King of Defi</div> */}
          {/* <div className="play-btn">
            <i className="fa-solid fa-play"></i>
          </div> */}
          <div className="title">
            <img src={crown} alt="crown"></img>
          </div>
          <div className="address-leader">Address</div>
          {gameLeader && <span>{gameLeader}</span>}

          <div className="address-leader">USD Amount</div>
          <span>${gameLeaderUSD}</span>
        </div>
        <button type="submit">Steal The Crown</button>
      </form>
    </CustomModal>
  );
}

export default MarketModal;
