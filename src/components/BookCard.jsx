import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const BookCard = ({ book }) => (
  <article className="card">
    <div className="card__header">
      <div>
        <h3>{book.title}</h3>
        {book.author && <p className="card__muted">by {book.author}</p>}
      </div>
      <span className="card__badge">{book.status}</span>
    </div>

    {book.description && <p className="card__body">{book.description}</p>}

    <footer className="card__footer">
      <small className="card__muted">
        Added on {formatDate(book.createdAt)}
      </small>
      {book.summaries?.length ? (
        <Link to={`/summaries/${book.summaries[0].id}`} className="card__cta">
          View summary
        </Link>
      ) : (
        <span className="card__muted">No summary yet</span>
      )}
    </footer>
  </article>
);

export default BookCard;

