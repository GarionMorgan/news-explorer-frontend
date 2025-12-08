import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SavedArticlesInfo from "../SavedArticlesInfo/SavedArticlesInfo";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews({
  isLoggedIn,
  currentUser,
  savedArticles,
  savedArticlesData,
  handleSaveClick,
  onSignOut,
}) {
  // Extract keywords from saved articles data
  const keywords = savedArticlesData
    .map((article) => article.keyword)
    .filter(Boolean);

  // Filter out invalid articles - display all valid articles
  const validSavedArticles = savedArticlesData.filter(
    (a) => a && a.title && a.source && a.source.name
  );

  return (
    <main className="saved-news">
      <div className="saved-news__header">
        <Header
          isHomePage={false}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onSignOut={onSignOut}
        />
      </div>
      <SavedArticlesInfo
        currentUser={currentUser}
        savedArticles={savedArticlesData}
        keywords={keywords}
      />

      {savedArticlesData.length > 0 && (
        <section className="saved-news__cards-content">
          <div className="saved-news__cards">
            {validSavedArticles.map((article, index) => (
              <NewsCard
                key={article.url || index}
                article={article}
                isLoggedIn={isLoggedIn}
                isSaved={true} // All saved articles are saved by definition
                onSaveClick={handleSaveClick}
                showTrash={true}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
export default SavedNews;
