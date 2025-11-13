import "./NewsCard.css";

function NewsCard({ article, isLoggedIn, isSaved, onSaveClick }) {
  const {
    source = {},
    title = "",
    publishedAt = "",
    description = "",
    urlToImage = "",
  } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="news-card">
      <img src={urlToImage} alt={title} className="news-card__image" />

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>
      <div
        className={`news-card__save-icon ${
          isLoggedIn ? "active" : "inactive"
        } ${isSaved ? "saved" : ""}`}
        onClick={() => isLoggedIn && onSaveClick(article)}
        title={
          !isLoggedIn
            ? "Sign in to save articles"
            : isSaved
            ? "Unsave article"
            : "Save article"
        }
      ></div>
    </div>
  );
}

export default NewsCard;
