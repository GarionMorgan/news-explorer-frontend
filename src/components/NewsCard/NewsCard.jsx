import "./NewsCard.css";
import SaveIconNormal from "../../assets/save_icon_normal.svg";
import SaveIconMarked from "../../assets/save_icon_marked.svg";
import SaveIconHover from "../../assets/save_icon_hover.svg";
import TrashIcon from "../../assets/trash.svg";
import TrashIconHover from "../../assets/trash_hover.svg";
import { useState } from "react";

function NewsCard({
  article,
  isLoggedIn,
  isSaved,
  onSaveClick,
  onSignInClick,
  showTrash = false,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isCardHovering, setIsCardHovering] = useState(false);
  const {
    source = {},
    title = "",
    publishedAt = "",
    description = "",
    urlToImage = "",
    url = "",
  } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on the save/trash icon
    if (e.target.closest(".news-card__save-icon")) {
      return;
    }
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className={`news-card ${isCardHovering ? "news-card--hover" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsCardHovering(true)}
      onMouseLeave={() => setIsCardHovering(false)}
      style={{ cursor: "pointer" }}
    >
      <img src={urlToImage} alt={title} className="news-card__image" />

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>
      <img
        src={
          showTrash
            ? isHovering
              ? TrashIconHover
              : TrashIcon
            : isSaved
            ? SaveIconMarked
            : isLoggedIn && isHovering
            ? SaveIconHover
            : SaveIconNormal
        }
        alt={
          showTrash
            ? "Remove article"
            : isSaved
            ? "Saved article"
            : "Save article"
        }
        className={`news-card__save-icon ${
          isLoggedIn ? "active" : "inactive"
        } ${isSaved ? "saved" : ""}`}
        onClick={() =>
          isLoggedIn ? onSaveClick(article) : onSignInClick && onSignInClick()
        }
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        title={
          showTrash
            ? "Remove article"
            : !isLoggedIn
            ? "Sign in to save articles"
            : isSaved
            ? "Unsave article"
            : "Save article"
        }
      />
    </article>
  );
}

export default NewsCard;
