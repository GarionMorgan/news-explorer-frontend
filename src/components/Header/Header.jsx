import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import HamburgerMenu from "../../assets/hamburger_menu.svg";
import HamburgerMenuBlack from "../../assets/hamburger_menu_black.svg";
import CloseIcon from "../../assets/close_icon.svg";

function Header({
  handleSignInClick,
  handleSignUpClick,
  isHomePage = true,
  isLoggedIn,
  currentUser,
  onSignOut,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isOnSavedPage = location.pathname === "/saved-news";

  console.log(
    "Header received - isLoggedIn:",
    isLoggedIn,
    "currentUser:",
    currentUser
  ); // Debug log

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__title">News Explorer</div>
        <button
          className="header__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <img
            src={isOnSavedPage ? HamburgerMenuBlack : HamburgerMenu}
            alt="Menu"
            className="header__hamburger-icon"
          />
        </button>
        <div className="header__navigation">
          <Navigation
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onSignOut={onSignOut}
            handleSignInClick={handleSignInClick}
          />
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
          <div className="mobile-menu">
            <div className="mobile-menu__header">
              <div className="mobile-menu__title">NewsExplorer</div>
              <button
                className="mobile-menu__close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <img
                  src={CloseIcon}
                  alt="Close"
                  className="mobile-menu__close-icon"
                />
              </button>
            </div>
            <div className="mobile-menu__navigation">
              <Navigation
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onSignOut={onSignOut}
                handleSignInClick={handleSignInClick}
                isMobileMenu={true}
                closeMobileMenu={closeMobileMenu}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
