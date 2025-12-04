import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function RegisterModal({ isOpen, onClose, onSubmit, onSignInClick }) {
  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      secondButtonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      onSecondButtonClick={onSignInClick}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="register-email"
        placeholder="Enter email"
        className="modal__input"
        required
      />
      <label htmlFor="register-password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="Enter password"
        className="modal__input"
        required
      />
      <label htmlFor="register-name" className="modal__label">
        Username
      </label>
      <input
        type="text"
        name="name"
        id="register-name"
        placeholder="Enter your Username"
        className="modal__input"
        required
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
