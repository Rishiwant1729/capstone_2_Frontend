import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteBook, getBooks } from "../services/api";
import useAuth from "../hooks/useAuth";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
      setError("");
    } catch (err) {
      setError(err.message);
      if (err.message.includes("token")) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📚 My Books Dashboard</h1>
        <div className="header-actions">
          <Link to="/upload" className="btn btn-primary">
            + Upload Book
          </Link>
          <Link to="/profile" className="btn btn-secondary">
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      {books.length === 0 ? (
        <div className="empty-state">
          <h2>No books uploaded yet</h2>
          <p>Start by uploading your first book!</p>
          <Link to="/upload" className="btn btn-primary">
            Upload Your First Book
          </Link>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              {book.author && <p className="author">by {book.author}</p>}
              {book.description && (
                <p className="description">{book.description.slice(0, 100)}...</p>
              )}
              {book.summaries && (
                <p className="summary-preview">
                  {book.summaries.highlights || "Summary available"}
                </p>
              )}
              <p className="book-date">
                Uploaded: {new Date(book.createdAt).toLocaleDateString()}
              </p>
              <div className="book-actions">
                <Link to={`/books/${book.id}`} className="btn btn-view">
                  View Summary
                </Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e0e0e0;
        }
        .header-actions {
          display: flex;
          gap: 1rem;
        }
        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-size: 0.9rem;
        }
        .btn-primary {
          background: #3498db;
          color: white;
        }
        .btn-secondary {
          background: #95a5a6;
          color: white;
        }
        .btn-logout {
          background: #e74c3c;
          color: white;
        }
        .error-message {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .book-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .book-card h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }
        .author {
          color: #7f8c8d;
          font-style: italic;
          margin: 0.25rem 0;
        }
        .description {
          color: #555;
          font-size: 0.9rem;
          margin: 0.5rem 0;
        }
        .summary-preview {
          background: #ecf0f1;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          margin: 0.5rem 0;
        }
        .book-date {
          font-size: 0.8rem;
          color: #95a5a6;
          margin: 0.5rem 0;
        }
        .book-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .btn-view {
          flex: 1;
          background: #2ecc71;
          color: white;
          text-align: center;
        }
        .btn-delete {
          background: #e74c3c;
          color: white;
        }
        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default BooksList;
