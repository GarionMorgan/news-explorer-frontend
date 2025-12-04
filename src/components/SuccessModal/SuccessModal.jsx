import "./SuccessModal.css";
import CloseBtn from "../../assets/close_btn_white.svg";

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content--success">
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={CloseBtn}
            alt="X close button"
            className="modal__close-btn"
          />
        </button>
        <h2 className="modal__title--success">
          Registration successfully completed!
        </h2>
        <button
          className="modal__success-btn"
          type="button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
