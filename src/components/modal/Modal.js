import { Modal } from "react-bootstrap";
import { useWeb3Context } from "../../hooks";

export default function CustomModal({
  children,
  show,
  handleClose,
  class_name = "first_modal",
}) {
  const { connected } = useWeb3Context();
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={class_name}
        centered
      >
        {!connected ? (
          <div className="wallet-not-connected">
            <div className="head">
              <div></div>
              <i className="fa-solid fa-xmark" onClick={handleClose}></i>
            </div>
            <span> Wallet not connected</span>
          </div>
        ) : (
          <>{children}</>
        )}
      </Modal>
    </>
  );
}
