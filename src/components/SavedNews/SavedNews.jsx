function SavedNews() {
  return (
    <div className="saved-news">
      <Header />
      <Navigation />
      <Main savedArticlesOnly={true} />
      <Footer />
    </div>
  );
}
export default SavedNews;
