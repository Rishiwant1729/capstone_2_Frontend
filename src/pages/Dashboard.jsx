import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SummaryCard from "../components/SummaryCard";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const {
    data: books = [],
    loading: booksLoading,
    error: booksError,
  } = useFetch("/books");

  const {
    data: summaries = [],
    loading: summariesLoading,
    error: summariesError,
  } = useFetch("/summaries");

  return (
    <section className="page">
      <h1>Your library</h1>
      <p className="card__muted">
        View uploaded PDFs and auto-generated summaries in one place.
      </p>

      {booksLoading && <LoadingSpinner label="Loading books..." />}
      {booksError && <p className="status status--error">{booksError}</p>}

      {!booksLoading && !booksError && (
        <div className="card-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <h2 style={{ marginTop: "3rem" }}>Summaries</h2>
      {summariesLoading && <LoadingSpinner label="Loading summaries..." />}
      {summariesError && (
        <p className="status status--error">{summariesError}</p>
      )}

      {!summariesLoading && !summariesError && (
        <div className="card-grid">
          {summaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;

