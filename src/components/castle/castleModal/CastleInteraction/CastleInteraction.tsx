import React, { useEffect, useState } from "react";
import { decimalToExact, exactToDecimal } from "../../../../helpers/conversion";
import { getLastUSDPrice, getUSDForAmount } from "../../../../helpers/swapRead";
import { useContractContext } from "../../../../hooks/contract";
import { useChainId } from "../../../../hooks/web3/web3Context";
import { useTransactionAdder } from "../../../../state/transactions/hooks";
import { useAddress } from "../../../../hooks";
import { swapGameTokens } from "../../../../helpers/gameSubmit";
import { Contract, ethers } from "ethers";
import { useDispatch } from "react-redux";
import { finalizeTransaction } from "../../../../state/transactions/actions";

function CastleInteraction(props: any) {
  const { from, to, handleModalClose, handleFromModal, handleToModal } = props;
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [buttonText, setButtonText] = useState("Enter Amount");
  const { chainLinkHub, kingOfDefiV0 } = useContractContext();
  const chainId = useChainId();
  const transactionAdder = useTransactionAdder();
  const address = useAddress();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    console.log(value, from.index, to.index);
    value > 0 && setButtonText("Swap");
    setFromValue(value);
    fetchToBalance(value);
  };

  const fetchToBalance = async (value: number) => {
    let usdEquivalent = 0;
    if (from.index != 0) {
      usdEquivalent = await getUSDForAmount(
        chainLinkHub?.contract,
        from.index,
        value
      );
    } else {
      usdEquivalent = value;
    }
    console.log(usdEquivalent, "from-token usdEquivalent");

    let toTokenUSDPrice = 0;
    if (to.index !== 0) {
      const toTokenUSDPriceBN = await getLastUSDPrice(
        chainLinkHub?.contract,
        to.index
      );
      console.log(toTokenUSDPriceBN);
      toTokenUSDPrice = decimalToExact(toTokenUSDPriceBN, to.decimals);
    } else {
      toTokenUSDPrice = 1;
    }
    console.log(toTokenUSDPrice, "to-token price in USD");

    const toEquivalent =
      toTokenUSDPrice !== 0 ? usdEquivalent / toTokenUSDPrice : 0;
    setToValue(toEquivalent);
  };

  const handleSubmit = () => {
    if (
      kingOfDefiV0 &&
      kingOfDefiV0.signer &&
      kingOfDefiV0.contract &&
      from.index != null &&
      to.index != null &&
      fromValue &&
      fromValue > 0
    ) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);

      // getApproveResponse(signedContract);
      swapGameTokensAction(signedContract);
    } else {
      console.log("Initializing...Please wait");
    }
  };

  const swapGameTokensAction = async (contract: Contract | null) => {
    try {
      if (kingOfDefiV0 && kingOfDefiV0.decimal) {
        const bigAmount = exactToDecimal(fromValue, from.decimals);
        const res = await swapGameTokens(
          contract,
          address,
          from.index,
          to.index,
          bigAmount
        );
        transactionAdder(res, {
          summary: "Swap token",
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
            alert("Swap token success");
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
            alert("Swap token failed");
          });
      }
    } catch (err: any) {
      alert("Error " + err?.data?.message);
    }
  };

  useEffect(() => {
    setFromValue(0);
    setToValue(0);
  }, [from, to]);

  return (
    <form>
      <>
        <div className="head">
          <h3>The Castle</h3>
          <i className="fa-solid fa-xmark" onClick={handleModalClose}></i>
        </div>
        <div className="field">
          <p>From ({from?.name})</p>
          <div className="select-dummy">
            <img
              src={from?.logoURI ? from?.logoURI : from}
              alt=""
              onClick={handleFromModal}
            />
            <input
              type="number"
              name="from_value"
              value={fromValue}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="arrow">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
        <div className="field">
          <p>To ({to?.name})</p>
          <div className="select-dummy">
            <img
              src={to?.logoURI ? to?.logoURI : to}
              alt=""
              onClick={handleToModal}
            />
            <input type="number" name="to_value" value={toValue} disabled />
          </div>
        </div>
        <button type="button" onClick={() => handleSubmit()}>
          {buttonText}
        </button>
      </>
    </form>
  );
}

export default CastleInteraction;
