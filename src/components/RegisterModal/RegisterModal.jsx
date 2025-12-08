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
      {({ handleBlur, handleChange, errors, touched }) => (
        <>
          <label htmlFor="register-email" className="modal__label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="register-email"
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
          <label htmlFor="register-password" className="modal__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="register-password"
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
          <label htmlFor="register-name" className="modal__label">
            Username
          </label>
          <input
            type="text"
            name="name"
            id="register-name"
            placeholder="Enter your Username"
            className={`modal__input ${
              touched.name && errors.name ? "modal__input_error" : ""
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.name && errors.name && (
            <span className="modal__error">{errors.name}</span>
          )}
        </>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
