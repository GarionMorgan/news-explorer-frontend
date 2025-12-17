import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(keyword.trim());
  };

  return (
    <div className="searchForm">
      <h1 className="searchForm__header">What's going on in the world?</h1>
      <p className="searchForm__subheader">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="searchForm__form" onSubmit={handleInputChange}>
        <input
          type="text"
          className="searchForm__input"
          placeholder="Enter topic"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="searchForm__button">
          Search
        </button>
        {error && <p className="searchForm__error">{error}</p>}
      </form>
    </div>
  );
}
export default SearchForm;
