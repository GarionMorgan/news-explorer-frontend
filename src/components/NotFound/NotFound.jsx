import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__icon"></div>
      <h3 className="not-found__title">Nothing found</h3>
      <p className="not-found__message">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NotFound;
