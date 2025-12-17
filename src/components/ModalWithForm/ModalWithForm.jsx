import "./ModalWithForm.css";
import CloseBtn from "../../assets/close_btn_white.svg";
import { useState } from "react";

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formValues, setFormValues] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateName = (name) => {
    return name.length >= 2 && name.length <= 30;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    let error = "";
    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!validateEmail(value)) error = "Invalid email address";
    } else if (name === "password") {
      if (!value) error = "Password is required";
      else if (!validatePassword(value))
        error = "Password must be at least 8 characters";
    } else if (name === "name") {
      if (!value) error = "Username is required";
      else if (!validateName(value)) error = "Username must be 2-30 characters";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate all fields
    const newErrors = {};
    if (data.email && !validateEmail(data.email)) {
      newErrors.email = "Invalid email address";
    }
    if (data.password && !validatePassword(data.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (data.name && !validateName(data.name)) {
      newErrors.name = "Username must be 2-30 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ email: true, password: true, name: true });
      return;
    }

    onSubmit(data);
  };

  // Check if form is valid
  const isFormValid = () => {
    // Check if all required fields have values
    const hasEmail = formValues.email && formValues.email.trim().length > 0;
    const hasPassword =
      formValues.password && formValues.password.trim().length > 0;
    const hasName =
      title === "Sign up"
        ? formValues.name && formValues.name.trim().length > 0
        : true;

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    // All fields must be filled and no errors
    return hasEmail && hasPassword && hasName && !hasErrors;
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
        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          {typeof children === "function"
            ? children({ handleBlur, handleChange, errors, touched })
            : children}
          <button
            className={`modal__submit-btn ${
              !isFormValid() ? "modal__submit-btn_disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid()}
          >
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
