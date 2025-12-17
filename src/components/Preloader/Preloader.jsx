import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__spinner"></div>
      <div className="preloader__message">Searching for news...</div>
    </div>
  );
}
export default Preloader;
