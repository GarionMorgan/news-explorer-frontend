import "./ErrorMessage.css";

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <div className="error-message__icon">
        <img src="" alt="" />
      </div>
      <p className="error-message__text">{message}</p>
    </div>
  );
}

export default ErrorMessage;
