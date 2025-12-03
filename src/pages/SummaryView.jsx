import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";
import formatDate from "../utils/formatDate";

const SummaryView = () => {
  const { summaryId } = useParams();
  const {
    data: summary,
    loading,
    error,
  } = useFetch(`/summaries/${summaryId}`);

  if (loading) {
    return (
      <section className="page">
        <LoadingSpinner label="Opening summary..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <p className="status status--error">{error}</p>
      </section>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <section className="page">
      <article className="card">
        <header className="card__header">
          <div>
            <p className="card__badge">Summary</p>
            <h1>{summary.book?.title}</h1>
            {summary.book?.author && (
              <p className="card__muted">by {summary.book.author}</p>
            )}
          </div>
          <small className="card__muted">
            Generated on {formatDate(summary.createdAt)}
          </small>
        </header>

        <p className="card__body">{summary.content}</p>

        {summary.highlights && (
          <footer className="card__footer">
            <span className="card__badge">Key highlight</span>
            <p className="card__muted">{summary.highlights}</p>
          </footer>
        )}
      </article>
    </section>
  );
};

export default SummaryView;

