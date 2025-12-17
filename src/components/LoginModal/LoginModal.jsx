import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSubmit, onSignUpClick }) {
  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      secondButtonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      onSecondButtonClick={onSignUpClick}
    >
      {({ handleBlur, handleChange, errors, touched }) => (
        <>
          <label htmlFor="login-email" className="modal__label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Enter email"
            className={`modal__input ${
              touched.email && errors.email ? "modal__input_error" : ""
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors.email && (
            <span className="modal__error">{errors.email}</span>
          )}
          <label htmlFor="login-password" className="modal__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Enter password"
            className={`modal__input ${
              touched.password && errors.password ? "modal__input_error" : ""
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.password && errors.password && (
            <span className="modal__error">{errors.password}</span>
          )}
        </>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
