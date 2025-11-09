import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSubmit }) {
  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      secondButtonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="login-email"
        placeholder="Enter email"
        className="modal__input"
        required
      />
      <label htmlFor="login-password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="login-password"
        placeholder="Enter password"
        className="modal__input"
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
