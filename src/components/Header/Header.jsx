import "./Header.css";

function Header({ handleSignInClick, handleSignUpClick, isHomePage = true }) {
  return (
    <header className="header">
      <div className="header__title">News Explorer</div>
      <div className="header__navigation">
        <button className={`header__home-btn ${isHomePage ? "active" : ""}`}>
          Home
        </button>
        <button className="header__sign-in-btn" onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
