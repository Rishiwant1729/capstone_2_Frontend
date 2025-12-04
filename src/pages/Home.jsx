import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="text-center">
          <h1 className="title">Welcome to CritiCore</h1>
          <p className="subtitle">
            Upload your PDFs and get instant AI-powered summaries
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📚</div>
            <h3>Upload Books</h3>
            <p>Upload PDF files and manage your personal library</p>
          </div>
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Quick Summaries</h3>
            <p>Get instant summaries extracted from your PDFs</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Easy Management</h3>
            <p>View, search, and delete books from your dashboard</p>
          </div>
        </div>
      </div>

      <style>{`
        .home-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .home-container {
          max-width: 1200px;
          width: 100%;
        }
        .text-center {
          text-align: center;
          margin-bottom: 4rem;
        }
        .title {
          font-size: 4rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }
        .subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          cursor: pointer;
        }
        .btn-primary {
          background: white;
          color: #667eea;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
          color: white;
          transition: transform 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-8px);
        }
        .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
        }
        .feature-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          .subtitle {
            font-size: 1.2rem;
          }
          .cta-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

