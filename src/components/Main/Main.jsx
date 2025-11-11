import { useEffect, useState } from "react";
import { useModalClose } from "../../hooks/useModalClose";
import "./Main.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";

function Main({
  articles,
  isLoading,
  errorMessage,
  onSearch,
  isLoggedIn,
  savedArticles,
  handleSaveClick,
}) {
  // State for managing active modals
  const [activeModal, setActiveModal] = useState(false);

  const [visibleCount, setVisibleCount] = useState(3);

  // Handlers to open modals
  const handleSignUpClick = () => {
    setActiveModal("signup");
  };

  const handleSignInClick = () => {
    setActiveModal("signin");
  };

  // Handlers to switch between modals
  const handleSwitchToSignUp = () => {
    setActiveModal("signup");
  };

  const handleSwitchToSignIn = () => {
    setActiveModal("signin");
  };

  const closeActiveModal = () => {
    setActiveModal(false);
  };

  // Use custom hook to handle modal close events
  useModalClose(!!activeModal, closeActiveModal);

  // Filter out invalid articles
  const validArticles = articles.filter(
    (a) => a && a.title && a.source && a.source.name
  );

  const visibleArticles = validArticles.slice(0, visibleCount);

  return (
    <div className="main">
      <div className="main__header">
        <Header
          handleSignInClick={handleSignInClick}
          handleSignUpClick={handleSignUpClick}
        />
        <SearchForm onSearch={onSearch} />
      </div>
      {isLoading ? (
        <Preloader />
      ) : errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : articles.length > 0 ? (
        <>
          {visibleArticles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={savedArticles.includes(article.url)}
              onSaveClick={handleSaveClick}
            />
          ))}

          {visibleCount < articles.length && (
            <button
              className="main__load-more-btn"
              onClick={() => setVisibleCount(visibleCount + 3)}
            >
              Show more
            </button>
          )}
        </>
      ) : null}

      <About />
      <Footer />
      <LoginModal
        isOpen={activeModal === "signin"}
        onClose={closeActiveModal}
        onSignUpClick={handleSwitchToSignUp}
      />
      <RegisterModal
        isOpen={activeModal === "signup"}
        onClose={closeActiveModal}
        onSignInClick={handleSwitchToSignIn}
      />
    </div>
  );
}

export default Main;
