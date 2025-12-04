import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  getBookSummary, 
  addNote, 
  updateNote, 
  deleteNote,
  updateSummary,
  deleteSummary,
  regenerateSummary,
} from "../services/api";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  
  // Summary editing states
  const [editingSummary, setEditingSummary] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const data = await getBookSummary(id);
      setBook(data);
      setNotes(data.summaries?.notes || []);
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

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !book.summaries) return;

    try {
      setNoteLoading(true);
      const result = await addNote(book.summaries.id, newNote);
      setNotes([result.note, ...notes]);
      setNewNote("");
    } catch (err) {
      alert(err.message);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleEditNote = async (noteId) => {
    if (!editingContent.trim()) return;

    try {
      setNoteLoading(true);
      const result = await updateNote(noteId, editingContent);
      setNotes(notes.map((note) => (note.id === noteId ? result.note : note)));
      setEditingNoteId(null);
      setEditingContent("");
    } catch (err) {
      alert(err.message);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      setNoteLoading(true);
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (err) {
      alert(err.message);
    } finally {
      setNoteLoading(false);
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditingContent("");
  };

  const handleEditSummary = () => {
    setSummaryContent(book.summaries.content);
    setEditingSummary(true);
  };

  const handleSaveSummary = async () => {
    if (!summaryContent.trim()) return;

    try {
      setSummaryLoading(true);
      const result = await updateSummary(id, summaryContent);
      setBook({
        ...book,
        summaries: result.summary,
      });
      setEditingSummary(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleCancelEditSummary = () => {
    setEditingSummary(false);
    setSummaryContent("");
  };

  const handleDeleteSummary = async () => {
    if (!confirm("Are you sure you want to delete this summary? This action cannot be undone.")) return;

    try {
      setSummaryLoading(true);
      await deleteSummary(id);
      // Refresh book details
      await fetchBookDetails();
    } catch (err) {
      alert(err.message);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleRegenerateSummary = async () => {
    if (!confirm("This will regenerate the summary using AI. The current summary will be replaced. Continue?")) return;

    try {
      setSummaryLoading(true);
      const result = await regenerateSummary(id);
      setBook({
        ...book,
        summaries: result.summary,
        status: "completed",
      });
      alert("Summary regenerated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSummaryLoading(false);
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
          <div className="summary-header">
            <h2>📝 Summary</h2>
            {book.summaries && !editingSummary && (
              <div className="summary-actions">
                <button
                  onClick={handleEditSummary}
                  className="btn-action"
                  disabled={summaryLoading}
                  title="Edit Summary"
                >
                  ✏️ Edit
                </button>
                {book.pdfPath && (
                  <button
                    onClick={handleRegenerateSummary}
                    className="btn-action btn-regenerate"
                    disabled={summaryLoading}
                    title="Regenerate with AI"
                  >
                    🔄 Regenerate
                  </button>
                )}
                <button
                  onClick={handleDeleteSummary}
                  className="btn-action btn-delete"
                  disabled={summaryLoading}
                  title="Delete Summary"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          {summaryLoading && (
            <div className="summary-loading">
              <p>⏳ Processing...</p>
            </div>
          )}

          {book.summaries ? (
            editingSummary ? (
              <div className="edit-summary-form">
                <textarea
                  value={summaryContent}
                  onChange={(e) => setSummaryContent(e.target.value)}
                  rows="12"
                  disabled={summaryLoading}
                  placeholder="Edit summary content..."
                />
                <div className="form-actions">
                  <button
                    onClick={handleSaveSummary}
                    className="btn btn-primary"
                    disabled={summaryLoading || !summaryContent.trim()}
                  >
                    {summaryLoading ? "Saving..." : "Save Summary"}
                  </button>
                  <button
                    onClick={handleCancelEditSummary}
                    className="btn btn-secondary"
                    disabled={summaryLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
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
                    {book.summaries.updatedAt !== book.summaries.createdAt && " (edited)"}
                  </small>
                </div>
              </div>
            )
          ) : (
            <div className="no-summary">
              <p>No summary available for this book yet.</p>
              {book.pdfPath && (
                <button
                  onClick={handleRegenerateSummary}
                  className="btn btn-primary"
                  disabled={summaryLoading}
                >
                  {summaryLoading ? "Generating..." : "Generate Summary"}
                </button>
              )}
            </div>
          )}
        </div>

        {book.pdfPath && (
          <div className="file-info">
            <h3>📄 PDF File</h3>
            <p>File available: {book.pdfPath.split("/").pop()}</p>
          </div>
        )}

        {/* Notes Section */}
        {book.summaries && (
          <div className="notes-section">
            <h2>📌 My Notes</h2>
            
            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="add-note-form">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                rows="3"
                disabled={noteLoading}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={noteLoading || !newNote.trim()}
              >
                {noteLoading ? "Adding..." : "Add Note"}
              </button>
            </form>

            {/* Notes List */}
            <div className="notes-list">
              {notes.length === 0 ? (
                <div className="no-notes">
                  <p>No notes yet. Add your first note above!</p>
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="note-card">
                    {editingNoteId === note.id ? (
                      <div className="edit-note-form">
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          rows="3"
                          disabled={noteLoading}
                        />
                        <div className="note-actions">
                          <button
                            onClick={() => handleEditNote(note.id)}
                            className="btn btn-save"
                            disabled={noteLoading || !editingContent.trim()}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn btn-cancel"
                            disabled={noteLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="note-content">{note.content}</p>
                        <div className="note-meta">
                          <small>
                            {new Date(note.createdAt).toLocaleString()}
                            {note.updatedAt !== note.createdAt && " (edited)"}
                          </small>
                          <div className="note-actions">
                            <button
                              onClick={() => startEditing(note)}
                              className="btn-icon"
                              title="Edit"
                              disabled={noteLoading}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="btn-icon"
                              title="Delete"
                              disabled={noteLoading}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
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
        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .summary-header h2 {
          margin: 0;
          color: #2c3e50;
        }
        .summary-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-action {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          transition: all 0.2s;
        }
        .btn-action:hover {
          background: #667eea;
          color: white;
        }
        .btn-action:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-regenerate {
          color: #27ae60;
          border-color: #27ae60;
        }
        .btn-regenerate:hover {
          background: #27ae60;
          color: white;
        }
        .btn-delete {
          color: #e74c3c;
          border-color: #e74c3c;
        }
        .btn-delete:hover {
          background: #e74c3c;
          color: white;
        }
        .summary-loading {
          text-align: center;
          padding: 2rem;
          color: #667eea;
          font-weight: 600;
        }
        .edit-summary-form {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
        }
        .edit-summary-form textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          line-height: 1.8;
          resize: vertical;
          margin-bottom: 1rem;
        }
        .edit-summary-form textarea:focus {
          outline: none;
          border-color: #667eea;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
        }
        .form-actions button {
          flex: 1;
        }
        .btn-secondary {
          background: #95a5a6;
          color: white;
        }
        .btn-secondary:hover {
          background: #7f8c8d;
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
        .no-summary p {
          margin-bottom: 1rem;
        }
        .no-summary button {
          margin-top: 1rem;
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
        
        /* Notes Section Styles */
        .notes-section {
          margin-top: 2rem;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 12px;
        }
        .notes-section h2 {
          margin: 0 0 1.5rem 0;
          color: #2c3e50;
        }
        .add-note-form {
          margin-bottom: 2rem;
        }
        .add-note-form textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 0.75rem;
        }
        .add-note-form textarea:focus {
          outline: none;
          border-color: #667eea;
        }
        .add-note-form button {
          width: 100%;
        }
        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .no-notes {
          text-align: center;
          padding: 2rem;
          color: #7f8c8d;
          font-style: italic;
        }
        .note-card {
          background: white;
          padding: 1.25rem;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .note-content {
          margin: 0 0 0.75rem 0;
          color: #2c3e50;
          line-height: 1.6;
          white-space: pre-wrap;
        }
        .note-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid #ecf0f1;
        }
        .note-meta small {
          color: #95a5a6;
          font-size: 0.85rem;
        }
        .note-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0.25rem 0.5rem;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .btn-icon:hover {
          opacity: 1;
        }
        .btn-icon:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .edit-note-form textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 0.75rem;
        }
        .edit-note-form textarea:focus {
          outline: none;
          border-color: #667eea;
        }
        .btn-save {
          background: #27ae60;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-save:hover {
          background: #229954;
        }
        .btn-save:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
        .btn-cancel {
          background: #e74c3c;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-cancel:hover {
          background: #c0392b;
        }
        .btn-cancel:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BookDetails;
