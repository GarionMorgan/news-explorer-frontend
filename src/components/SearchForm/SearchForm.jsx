import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="searchForm">
      <h1 className="searchForm__header">What's going on in the world?</h1>
      <p className="searchForm__subheader">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="searchForm__form">
        <input
          type="text"
          className="searchForm__input"
          placeholder="Enter topic"
        />
        <button type="submit" className="searchForm__button">
          Search
        </button>
      </form>
    </div>
  );
}
export default SearchForm;
