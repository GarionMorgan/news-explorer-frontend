import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";
const apiKey =
  import.meta.env.VITE_NEWS_API_KEY || "ad69aa0a68f840e1ac10e575ee31bb71";
import newsApiBaseUrl, {
  saveArticle,
  unsaveArticle,
  isArticleSaved,
  getSavedArticles,
} from "../../utils/api";

function App() {
  // State for managing search form
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [savedArticlesData, setSavedArticlesData] = useState([]); // Full saved articles data
  const [currentUser, setCurrentUser] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState(""); // Store current search keyword

  const [errorMessage, setErrorMessage] = useState("");

  // Handlers for search form
  const handleSearch = async (keyword) => {
    setErrorMessage("");
    setArticles([]);
    setIsLoading(true);
    setCurrentKeyword(keyword); // Store the search keyword
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const formatDate = (date) => date.toISOString().split("T")[0];

    const url = `${newsApiBaseUrl}?q=${keyword}&from=${formatDate(
      sevenDaysAgo
    )}&to=${formatDate(today)}&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles?.length > 0) {
        setArticles(data.articles);
      } else {
        setErrorMessage("No articles found for the given keyword");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setErrorMessage("Failed to fetch articles");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // handle save clicks with API integration
  const handleSaveClick = async (article) => {
    if (!isLoggedIn) {
      console.log("User must be logged in to save articles");
      return;
    }

    const articleUrl = article.url;
    const isCurrentlySaved = isArticleSaved(articleUrl);

    if (isCurrentlySaved) {
      // Unsave the article
      const result = await unsaveArticle(articleUrl);
      if (result.success) {
        // Update local state - remove from saved articles
        setSavedArticles((prev) => prev.filter((url) => url !== articleUrl));
        // Reload saved articles data to keep it in sync
        await loadSavedArticles();
        console.log("Article unsaved successfully");
      } else {
        console.error("Failed to unsave article:", result.error);
      }
    } else {
      // Save the article
      const articleData = {
        ...article,
        keyword: currentKeyword, // Include the search keyword
      };

      const result = await saveArticle(articleData);
      if (result.success) {
        // Update local state - add to saved articles
        setSavedArticles((prev) => [...prev, articleUrl]);
        // Reload saved articles data to keep it in sync
        await loadSavedArticles();
        console.log("Article saved successfully");
      } else {
        console.error("Failed to save article:", result.error);
      }
    }
  };

  // Load saved articles for current user
  const loadSavedArticles = async () => {
    const result = await getSavedArticles();
    if (result.success) {
      // Store full saved articles data
      setSavedArticlesData(result.data);
      // Extract URLs from saved articles for compatibility with existing UI
      const savedUrls = result.data.map((article) => article.url);
      setSavedArticles(savedUrls);
    } else {
      console.error("Failed to load saved articles:", result.error);
    }
  };

  // Handle successful sign in
  const handleSignIn = async (userData) => {
    console.log("App handleSignIn received userData:", userData); // Debug log
    setIsLoggedIn(true);
    setCurrentUser(userData);
    // Load saved articles for this user
    await loadSavedArticles();
  };

  // Handle sign out
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]); // Clear saved articles on sign out
    setSavedArticlesData([]); // Clear saved articles data on sign out
  };

  return (
    <BrowserRouter basename="/news-explorer-frontend">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              articles={articles}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onSearch={handleSearch}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              handleSaveClick={handleSaveClick}
              currentUser={currentUser}
              currentKeyword={currentKeyword}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              savedArticles={savedArticles}
              savedArticlesData={savedArticlesData}
              handleSaveClick={handleSaveClick}
              onSignOut={handleSignOut}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
