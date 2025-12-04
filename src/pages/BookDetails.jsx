import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookSummary } from "../services/api";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const data = await getBookSummary(id);
      setBook(data);
      setError("");
    } catch (err) {
      setError(err.message);
      if (err.message.includes("token") || err.message.includes("not found")) {
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="book-details-page">
        <div className="loading">Loading book details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-details-page">
        <div className="error-container">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="book-details-page">
      <div className="details-container">
        <div className="header-section">
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="book-info">
          <h1>{book.title}</h1>
          {book.author && <p className="author">by {book.author}</p>}
          {book.description && (
            <div className="description-section">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          )}
          <div className="meta-info">
            <span>📅 Uploaded: {new Date(book.createdAt).toLocaleDateString()}</span>
            <span>📊 Status: {book.status}</span>
          </div>
        </div>

        <div className="summary-section">
          <h2>📝 Summary</h2>
          {book.summaries ? (
            <div className="summary-content">
              <p>{book.summaries.content}</p>
              {book.summaries.highlights && (
                <div className="highlights">
                  <h3>Key Highlights</h3>
                  <p>{book.summaries.highlights}</p>
                </div>
              )}
              <div className="summary-meta">
                <small>
                  Summary generated on{" "}
                  {new Date(book.summaries.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ) : (
            <div className="no-summary">
              <p>No summary available for this book yet.</p>
            </div>
          )}
        </div>

        {book.pdfPath && (
          <div className="file-info">
            <h3>📄 PDF File</h3>
            <p>File available: {book.pdfPath.split("/").pop()}</p>
          </div>
        )}
      </div>

      <style>{`
        .book-details-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 2rem;
        }
        .details-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .loading,
        .error-container {
          text-align: center;
          padding: 3rem;
        }
        .header-section {
          margin-bottom: 1.5rem;
        }
        .back-link {
          color: #3498db;
          text-decoration: none;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .book-info h1 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 2.5rem;
        }
        .author {
          color: #7f8c8d;
          font-size: 1.2rem;
          font-style: italic;
          margin: 0.5rem 0 1.5rem 0;
        }
        .description-section {
          background: #ecf0f1;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        .description-section h3 {
          margin: 0 0 1rem 0;
          color: #34495e;
        }
        .description-section p {
          color: #2c3e50;
          line-height: 1.6;
        }
        .meta-info {
          display: flex;
          gap: 2rem;
          margin: 1.5rem 0;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #555;
        }
        .summary-section {
          margin: 2rem 0;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }
        .summary-section h2 {
          margin: 0 0 1.5rem 0;
          color: #2c3e50;
        }
        .summary-content p {
          line-height: 1.8;
          color: #34495e;
          font-size: 1.05rem;
        }
        .highlights {
          margin-top: 1.5rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
        }
        .highlights h3 {
          margin: 0 0 0.75rem 0;
          color: #667eea;
          font-size: 1.1rem;
        }
        .summary-meta {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #ddd;
        }
        .summary-meta small {
          color: #95a5a6;
        }
        .no-summary {
          padding: 2rem;
          text-align: center;
          color: #7f8c8d;
        }
        .file-info {
          margin-top: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .file-info h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }
        .file-info p {
          color: #555;
          font-family: monospace;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-weight: 600;
        }
        .btn-primary {
          background: #3498db;
          color: white;
        }
        .btn-primary:hover {
          background: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default BookDetails;
