import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import LogoutIcon from "../../assets/logout_icon.svg";
import LogoutIconWhite from "../../assets/logout_icon_white.svg";

function Navigation({
  isLoggedIn,
  currentUser,
  onSignOut,
  handleSignInClick,
  isMobileMenu,
  closeMobileMenu,
}) {
  const location = useLocation();

  // Determine which page is active based on current path
  const isOnHomePage = location.pathname === "/";
  const isOnSavedPage = location.pathname === "/saved-news";

  const handleLinkClick = () => {
    if (isMobileMenu && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const handleSignOutClick = () => {
    onSignOut();
    if (isMobileMenu && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const handleSignInClickWrapper = () => {
    handleSignInClick();
    if (isMobileMenu && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <nav className={`navigation ${isMobileMenu ? "navigation--mobile" : ""}`}>
      <Link
        to="/"
        onClick={handleLinkClick}
        className={`navigation__link navigation__home-btn ${
          isOnHomePage ? "active" : ""
        }`}
      >
        Home
      </Link>
      {isLoggedIn ? (
        <>
          <Link
            to="/saved-news"
            onClick={handleLinkClick}
            className={`navigation__link navigation__saved-articles-btn ${
              isOnSavedPage ? "active" : ""
            }`}
          >
            Saved Articles
          </Link>
          <button className="navigation__user-btn" onClick={handleSignOutClick}>
            {currentUser?.name || "User"}
            <img
              src={isMobileMenu || isOnHomePage ? LogoutIconWhite : LogoutIcon}
              alt="Logout icon"
              className={`navigation__user-btn_image ${
                isMobileMenu || isOnHomePage
                  ? "navigation__user-btn_image--white"
                  : "navigation__user-btn_image--black"
              }`}
            />
          </button>
        </>
      ) : (
        <button
          className="navigation__sign-in-btn"
          onClick={handleSignInClickWrapper}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
