import CustomModal from "../modal/Modal";
import coin from "../../images/coin.svg";
import { bondingTokens } from "../../helpers/networks";

function SelectTokenModal({
  show,
  handleClose,
  handleSelectedToken,
  ignoreToken,
}) {
  const handleClick = (token) => {
    handleSelectedToken(token);
    handleClose();
  };
  return (
    <CustomModal show={show} handleClose={handleClose}>
      <div className="select_token_modal">
        <form action="">
          <div className="head">
            <h3>Select Token</h3>
            <i className="fa-solid fa-xmark" onClick={handleClose}></i>
          </div>
          <ul className="token-list">
            {bondingTokens
              ?.filter((item) => item?.name != ignoreToken)
              ?.map((token) => (
                <li onClick={() => handleClick(token)} key={token.address}>
                  <img src={token.logoURI} alt="" />
                  <span>{token.symbol}</span>
                </li>
              ))}
          </ul>
        </form>
      </div>
    </CustomModal>
  );
}

export default SelectTokenModal;
