import "./SavedArticlesInfo.css";

function SavedArticlesInfo({ currentUser, savedArticles, keywords }) {
  const username = currentUser?.name || "User";
  const articleCount = savedArticles?.length || 0;

  // Create a unique list of keywords
  const uniqueKeywords = keywords ? [...new Set(keywords)] : [];

  // Display first two keywords, then "and X other" for remaining
  const getKeywordsDisplay = () => {
    if (uniqueKeywords.length === 0) return "";
    if (uniqueKeywords.length === 1) return uniqueKeywords[0];
    if (uniqueKeywords.length === 2) return uniqueKeywords.join(", ");

    const firstTwoKeywords = uniqueKeywords.slice(0, 2).join(", ");
    const remainingCount = uniqueKeywords.length - 2;
    return `${firstTwoKeywords}, and ${remainingCount} other${
      remainingCount > 1 ? "s" : ""
    }`;
  };

  const keywordsList = getKeywordsDisplay();

  return (
    <section className="saved-articles-info">
      <div className="saved-articles-info__container">
        <p className="saved-articles-info__subtitle">Saved articles</p>
        <p className="saved-articles-info__title">
          {username}, you have {articleCount} saved article
          {articleCount !== 1 ? "s" : ""}
        </p>
        {uniqueKeywords.length > 0 && (
          <p className="saved-articles-info__keywords">
            By keywords:{" "}
            <span className="saved-articles-info__keywords-list">
              {keywordsList}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedArticlesInfo;
