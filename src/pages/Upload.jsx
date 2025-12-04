import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadBook } from "../services/api";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setStatus({ type: "error", message: "Please select a PDF file" });
      e.target.value = "";
      return;
    }
    setFile(selectedFile);
    setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      setStatus({ type: "error", message: "Title is required" });
      return;
    }

    setStatus({ type: "loading", message: "Uploading your book..." });

    try {
      const data = new FormData();
      data.append("title", formData.title);
      if (formData.author) data.append("author", formData.author);
      if (formData.description) data.append("description", formData.description);
      if (file) data.append("pdf", file);

      await uploadBook(data);
      setStatus({ type: "success", message: "Book uploaded successfully!" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>📤 Upload a Book</h1>
        <p className="subtitle">Upload a PDF file to generate a summary</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <label>
            Title *
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </label>

          <label>
            Author
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the book"
              rows="4"
            />
          </label>

          <label className="file-input-label">
            PDF File
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
            {file && <span className="file-name">Selected: {file.name}</span>}
          </label>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="btn btn-primary"
            >
              {status.type === "loading" ? "Uploading..." : "Upload Book"}
            </button>
          </div>
        </form>

        {status.message && (
          <p className={`status-message ${status.type}`}>{status.message}</p>
        )}
      </div>

      <style>{`
        .upload-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .upload-container {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
        }
        .upload-container h1 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }
        .subtitle {
          color: #7f8c8d;
          margin-bottom: 2rem;
        }
        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .upload-form label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
        .upload-form input,
        .upload-form textarea {
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .upload-form input:focus,
        .upload-form textarea:focus {
          outline: none;
          border-color: #667eea;
        }
        .file-input-label {
          cursor: pointer;
        }
        .file-input {
          cursor: pointer;
        }
        .file-name {
          font-size: 0.9rem;
          color: #27ae60;
          font-weight: normal;
          margin-top: 0.25rem;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-primary {
          background: #667eea;
          color: white;
        }
        .btn-primary:hover {
          background: #5568d3;
        }
        .btn-primary:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
        .btn-secondary {
          background: #e0e0e0;
          color: #2c3e50;
        }
        .btn-secondary:hover {
          background: #d0d0d0;
        }
        .status-message {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
          font-weight: 500;
        }
        .status-message.success {
          background: #d4edda;
          color: #155724;
        }
        .status-message.error {
          background: #f8d7da;
          color: #721c24;
        }
        .status-message.loading {
          background: #d1ecf1;
          color: #0c5460;
        }
      `}</style>
    </div>
  );
};

export default Upload;
