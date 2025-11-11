import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";
const apiKey = import.meta.env.VITE_NEWS_API_KEY;
import newsApiBaseUrl from "../../utils/api";

function App() {
  // State for managing search form
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  // Handlers for search form
  const handleSearch = async (keyword) => {
    setErrorMessage("");
    setArticles([]);
    setIsLoading(true);
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

  // handle save clicks
  const handleSaveClick = (article) => {
    const articleUrl = article.url;
    if (savedArticles.includes(articleUrl)) {
      setSavedArticles(savedArticles.filter((url) => url !== articleUrl));
    } else {
      setSavedArticles([...savedArticles, articleUrl]);
    }
  };

  return (
    <BrowserRouter>
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
            />
          }
        />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
