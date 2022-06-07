import React from "react";
import { subscribeToGames } from "../../../../helpers/gameSubmit";
import { useAddress } from "../../../../hooks";
import { useContractContext } from "../../../../hooks/contract/contractContext";
import { useTransactionAdder } from "../../../../state/transactions/hooks";
import { useAppDispatch } from "../../../../store/hooks";
import { Contract, ethers } from "ethers";
import { finalizeTransaction } from "../../../../state/transactions/actions";
import { useChainId } from "../../../../hooks/web3/web3Context";
import { checkSubscribed } from "../../../../helpers/swapRead";

function CastlePlay(props: any) {
  const { kingOfDefiV0 } = useContractContext();
  const address = useAddress();
  const dispatch = useAppDispatch();
  const chainId = useChainId();
  const transactionAdder = useTransactionAdder();
  // const playGame = subscribeToGame();

  const handleCheck = async () => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      const checkSubscription = await checkSubscribed(
        signedContract,
        2735,
        address
      );
      if (checkSubscription) {
        props.handlePlay();
      } else {
        handleSubscribe();
      }
    }
  };

  const handleSubscribe = () => {
    if (kingOfDefiV0 && kingOfDefiV0.signer && kingOfDefiV0.contract) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      // getApproveResponse(signedContract);
      gameSubscription(signedContract);
    } else {
      alert("Initializing...Please wait");
    }
  };

  const gameSubscription = async (contract: Contract | null) => {
    if (kingOfDefiV0 && kingOfDefiV0.decimal) {
      const res = await subscribeToGames(
        contract,
        address,
        kingOfDefiV0.address
      );
      transactionAdder(res, {
        summary: "Subscribe to Game",
      });
      const { hash } = res;
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
        });
    }
  };

  return (
    <div className="play-modal">
      <div className="title">Play</div>
      <div className="title">King of Defi</div>
      <div className="play-btn" onClick={() => handleCheck()}>
        <i className="fa-solid fa-play"></i>
      </div>
    </div>
  );
}

export default CastlePlay;
