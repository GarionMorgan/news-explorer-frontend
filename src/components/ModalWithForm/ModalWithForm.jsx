import "./ModalWithForm.css";
import CloseBtn from "../../assets/close_btn_white.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  secondButtonText,
  isOpen,
  onClose,
  onSubmit,
  onSecondButtonClick,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={CloseBtn}
            alt="X close button"
            className="modal__close-btn"
          />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          <button className="modal__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
        {secondButtonText && (
          <div className="modal__second-button-container">
            <span className="modal__or-text">or</span>
            <button
              className="modal__second-btn"
              type="button"
              onClick={onSecondButtonClick}
            >
              {secondButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ModalWithForm;
