import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__title">News Explorer</div>
      <div className="header__navigation">
        <button className="header__home-btn">Home</button>
        <button className="header__sign-in-btn">Sign In</button>
      </div>
    </header>
  );
}

export default Header;
