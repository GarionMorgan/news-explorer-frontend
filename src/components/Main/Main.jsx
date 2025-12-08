import { useState } from "react";
import { useModalClose } from "../../hooks/useModalClose";
import { signUp, signIn, signOut } from "../../utils/api";
import "./Main.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Main({
  articles,
  isLoading,
  errorMessage,
  onSearch,
  isLoggedIn,
  savedArticles,
  handleSaveClick,
  currentUser,
  onSignIn,
  onSignOut,
}) {
  // State for managing active modals
  const [activeModal, setActiveModal] = useState(false);
  const [registeredUserCredentials, setRegisteredUserCredentials] =
    useState(null);

  const [visibleCount, setVisibleCount] = useState(3);
  const [hasSearched, setHasSearched] = useState(false);

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
    // Clear stored credentials when closing modal
    setRegisteredUserCredentials(null);
  };

  // Handle search with tracking
  const handleSearch = (searchTerm) => {
    setHasSearched(true);
    onSearch(searchTerm);
  };

  // Handle user registration
  const handleSignUp = async (userData) => {
    const result = await signUp(userData);
    if (result.success) {
      // Store credentials for auto-login
      setRegisteredUserCredentials({
        email: userData.email,
        password: userData.password,
      });
      // Show success modal
      setActiveModal("success");
    } else {
      // Handle registration error (show error message)
      console.error("Registration failed:", result.error);
    }
  };

  // Handle user sign in
  const handleSignIn = async (credentials) => {
    const result = await signIn(credentials);
    if (result.success) {
      closeActiveModal();
      // Update app state with user data
      onSignIn(result.data);
    } else {
      // Handle sign in error (show error message)
      console.error("Sign in failed:", result.error);
    }
  };

  // Handle user sign out
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      // Call parent component's sign out handler
      onSignOut();
    } else {
      console.error("Sign out failed:", result.error);
    }
  };

  // Handle auto sign-in from success modal
  const handleAutoSignIn = async () => {
    if (registeredUserCredentials) {
      const result = await signIn(registeredUserCredentials);
      if (result.success) {
        closeActiveModal();
        // Update app state with user data
        onSignIn(result.data);
        // Clear stored credentials
        setRegisteredUserCredentials(null);
      } else {
        console.error("Auto sign-in failed:", result.error);
      }
    }
  };

  // Use custom hook to handle modal close events
  useModalClose(!!activeModal, closeActiveModal);

  // Filter out invalid articles
  const validArticles = articles.filter(
    (a) => a && a.title && a.source && a.source.name
  );

  const visibleArticles = validArticles.slice(0, visibleCount);

  return (
    <main className="main">
      <div className="main__header">
        <Header
          handleSignInClick={handleSignInClick}
          handleSignUpClick={handleSignUpClick}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />
        <SearchForm onSearch={handleSearch} />
      </div>
      {isLoading ? (
        <Preloader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : articles.length > 0 ? (
        <>
          <section className="main__news-cards_content">
            <h2 className="main__news-cards-title">Search results</h2>
            <div className="main__news-cards">
              {visibleArticles.map((article, index) => (
                <NewsCard
                  key={article.url || index}
                  article={article}
                  isLoggedIn={isLoggedIn}
                  isSaved={savedArticles.includes(article.url)}
                  onSaveClick={handleSaveClick}
                  onSignInClick={handleSignInClick}
                />
              ))}
            </div>
            {visibleCount < articles.length && (
              <button
                className="main__load-more-btn"
                onClick={() => setVisibleCount(visibleCount + 3)}
              >
                Show more
              </button>
            )}
          </section>
        </>
      ) : hasSearched && articles.length === 0 ? (
        <NotFound />
      ) : null}

      <About />
      <Footer />
      <LoginModal
        isOpen={activeModal === "signin"}
        onClose={closeActiveModal}
        onSignUpClick={handleSwitchToSignUp}
        onSubmit={handleSignIn}
      />
      <RegisterModal
        isOpen={activeModal === "signup"}
        onClose={closeActiveModal}
        onSignInClick={handleSwitchToSignIn}
        onSubmit={handleSignUp}
      />
      <SuccessModal
        isOpen={activeModal === "success"}
        onClose={closeActiveModal}
        onSignInClick={handleAutoSignIn}
      />
    </main>
  );
}

export default Main;
