import formatDate from "../utils/formatDate";

const SummaryCard = ({ summary }) => (
  <article className="card">
    <div className="card__header">
      <div>
        <h3>{summary.book?.title}</h3>
        {summary.book?.author && (
          <p className="card__muted">by {summary.book.author}</p>
        )}
      </div>
      <small className="card__muted">
        {formatDate(summary.createdAt ?? summary.book?.createdAt)}
      </small>
    </div>

    <p className="card__body">{summary.content}</p>

    {summary.highlights && (
      <footer className="card__footer">
        <span className="card__badge">Highlights</span>
        <p className="card__muted">{summary.highlights}</p>
      </footer>
    )}
  </article>
);

export default SummaryCard;

