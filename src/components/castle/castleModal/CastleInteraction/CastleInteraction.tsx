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
import { toast, ToastContainer } from "react-toastify";

function CastleInteraction(props: any) {
  const { from, to, handleModalClose, handleFromModal, handleToModal } = props;
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [buttonStatus, setButtonStatus] = useState({
    error: "",
    swap: false,
    disable: false,
  });
  const { chainLinkHub, kingOfDefiV0 } = useContractContext();
  const chainId = useChainId();
  const transactionAdder = useTransactionAdder();
  const address = useAddress();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // value > 0 && setButtonText("Swap");
    setFromValue(value);
    fetchToBalance(value);
    checkDisable(value);
  };

  const fetchToBalance = async (value: number) => {
    let usdEquivalent = 0;
    let usdEquivalentBN;
    if (from.index != 0) {
      const bigNumberValue = value ? exactToDecimal(value, 18) : 0;
      usdEquivalentBN = await getUSDForAmount(
        chainLinkHub?.contract,
        from.index,
        bigNumberValue
      );
      usdEquivalent = decimalToExact(usdEquivalentBN, 18);
    } else {
      usdEquivalent = value;
    }

    let toTokenUSDPrice = 0;
    if (to.index !== 0) {
      const toTokenUSDPriceBN = await getLastUSDPrice(
        chainLinkHub?.contract,
        to.index
      );
      toTokenUSDPrice = decimalToExact(toTokenUSDPriceBN, 18);
    } else {
      toTokenUSDPrice = 1;
    }

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
        const bigAmount = exactToDecimal(fromValue, 18);
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
        toast.success("Transaction Submitted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setLoadingButton(true);

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
            toast.success("Swap Success", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoadingButton(false);
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
            toast.error("Swap Failed", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoadingButton(false);
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
    }
  };
  const checkDisable = (value: number | string) => {
    if (from && value && !isNaN(Number(value))) {
      updateButton(value, true);
    } else {
      updateButton(value, false);
    }
  };

  const updateButton = (value: number | string, swap: boolean) => {
    let disable = true;
    if (value > 0) {
      disable = false;
    }
    setButtonStatus({
      ...buttonStatus,
      disable: disable,
      swap: swap,
    });
  };

  const ButtonDisplay = () => {
    if (true) {
      if (fromValue > 100000) {
        return (
          <button type="button" onClick={() => handleSubmit()} disabled>
            Insufficient Balance
          </button>
        );
      } else if (fromValue == 0) {
        return (
          <button type="button" onClick={() => handleSubmit()} disabled>
            Enter Amount
          </button>
        );
      } else {
        if (buttonStatus.swap && !buttonStatus.disable) {
          return (
            <button
              className={`swap-button ${loadingButton ? "loading" : ""}`}
              type="button"
              onClick={() => handleSubmit()}
            >
              Swap
            </button>
          );
        } else {
          return (
            <button type="button" onClick={() => handleSubmit()} disabled>
              Error
            </button>
          );
        }
      }
    }
  };

  useEffect(() => {
    setFromValue(0);
    setToValue(0);
  }, [from, to]);

  return (
    <form>
      {/* <ToastContainer /> */}
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
              onChange={(e) => handleChange(e)}
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
        <ButtonDisplay />
      </>
    </form>
  );
}

export default CastleInteraction;
