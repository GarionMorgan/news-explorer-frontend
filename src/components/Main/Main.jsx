import { useEffect, useState } from "react";
import { useModalClose } from "../../hooks/useModalClose";
import "./Main.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";

function Main() {
  // State for managing active modals
  const [activeModal, setActiveModal] = useState(false);

  // Handlers to open modals
  const handleSignUpClick = () => {
    setActiveModal("signup");
  };

  const handleSignInClick = () => {
    console.log("Sign In Clicked");
    setActiveModal("signin");
  };

  const closeActiveModal = () => {
    setActiveModal(false);
  };

  // Use custom hook to handle modal close events
  useModalClose(!!activeModal, closeActiveModal);

  return (
    <div className="main">
      <div className="main__header">
        <Header
          handleSignInClick={handleSignInClick}
          handleSignUpClick={handleSignUpClick}
        />
        <SearchForm />
      </div>
      <About />
      <Footer />
      <LoginModal
        isOpen={activeModal === "signin"}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default Main;
