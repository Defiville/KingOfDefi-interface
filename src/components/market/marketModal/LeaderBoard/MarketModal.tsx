import React, { useEffect, useState } from "react";
import CustomModal from "../../../modal/Modal";
import coin from "../../../images/coin.svg";
import crown from "../../../../images/crown.svg";
import {
  getLeader,
  getLeaderUSD,
  stealTheCrown,
} from "../../../../helpers/leaderboard";
import { useContractContext } from "../../../../hooks/contract";
import { decimalToExact, exactToDecimal } from "../../../../helpers/conversion";
import { Contract, ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { finalizeTransaction } from "../../../../state/transactions/actions";
import { useTransactionAdder } from "../../../../state/transactions/hooks";
import { useAddress } from "../../../../hooks";
import { useChainId } from "../../../../hooks/web3/web3Context";
import { toast } from "react-toastify";

//@ts-ignore
function MarketModal({ show, handleClose }) {
  const { kingOfDefiV0 } = useContractContext();
  const [gameLeader, setGameLeader] = useState<String | null>();
  const [gameLeaderUSD, setGameLeaderUSD] = useState<number | null>();
  const dispatch = useDispatch();
  const chainId = useChainId();
  const transactionAdder = useTransactionAdder();
  const address = useAddress();
  //@ts-ignore
  const { week } = useSelector((state) => state.swapAssets);

  const leaderboardFetch = async () => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer && week) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      if (signedContract) {
        const leader = await getLeader(signedContract, week);
        setGameLeader(
          leader.substr(0, 6) + "..." + leader.substr(leader.length - 4)
        );
        checkUSDBalance(leader, signedContract);
      }
    }
  };

  const checkUSDBalance = async (leader: string, signedContract: Contract) => {
    const leaderUSD = await getLeaderUSD(signedContract, leader);
    const decimalLeaderUSD = decimalToExact(leaderUSD, 18);
    setGameLeaderUSD(decimalLeaderUSD);
  };

  useEffect(() => {
    leaderboardFetch();
  }, [kingOfDefiV0, week]);

  const handleStealCrown = () => {
    if (kingOfDefiV0 && kingOfDefiV0.signer && kingOfDefiV0.contract) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      checkStealCrown(signedContract);
    }
  };

  const checkStealCrown = async (contract: Contract | null) => {
    try {
      if (kingOfDefiV0 && kingOfDefiV0.decimal) {
        const res = await stealTheCrown(contract, address);
        transactionAdder(res, {
          summary: "Steal Crown",
        });
        const { hash } = res;
        toast.success("Initializing Crown Steal", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider
          .waitForTransaction(hash)
          .then((receipt: any) => {
            dispatch(
              finalizeTransaction({
                chainId: chainId,
                hash: hash,
                receipt: {
                  blockHash: receipt.blockHash,
                  blockNumber: receipt.blockNumber,
                  contractAddress: receipt.contractAddress,
                  from: receipt.from,
                  status: receipt.status,
                  to: receipt.to,
                  transactionHash: receipt.transactionHash,
                  transactionIndex: receipt.transactionIndex,
                },
              })
            );
            toast.success("Steal Crown Success", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // checkTokenAllowance(kingOfDefiV0);
          })
          .catch((err) => {
            dispatch(
              finalizeTransaction({
                chainId,
                hash,
                receipt: "failed",
              })
            );
            toast.error("Steal Crown Failed", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    } catch (err: any) {
      toast.error(`Error + ${err?.data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert("Error " + err?.data?.message);
    }
  };

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
        <button type="button" onClick={() => handleStealCrown()}>
          Steal The Crown
        </button>
      </form>
    </CustomModal>
  );
}

export default MarketModal;
