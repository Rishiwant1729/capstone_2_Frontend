import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "AI-Powered Summaries",
      description: "Get intelligent summaries powered by Google Gemini AI",
      icon: "🤖",
      color: "#667eea"
    },
    {
      title: "Smart Notes",
      description: "Add, edit, and organize your personal notes",
      icon: "📝",
      color: "#764ba2"
    },
    {
      title: "PDF Processing",
      description: "Upload and process PDF books instantly",
      icon: "📚",
      color: "#f093fb"
    }
  ];

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">📖</span>
            <span className="logo-text">CritiCore</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <div className="nav-actions">
            <Link to="/login" className="btn-nav btn-login">Log In</Link>
            <Link to="/signup" className="btn-nav btn-signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">2024 NEW FEATURES</div>
            <h1 className="hero-title">
              Smart Book
              <br />
              Summaries
            </h1>
            <p className="hero-description">
              Transform your reading experience with AI-powered summaries
              and intelligent note-taking
            </p>
            <Link to="/signup" className="btn-hero">
              GET STARTED
            </Link>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">�</div>
              <div className="card-label">POPULAR</div>
              <div className="card-title">Quick Summaries</div>
              <div className="card-price">
                <span className="price-new">Free</span>
                <span className="price-old">$9.99</span>
              </div>
            </div>

            <div className="main-image">
              <div className="image-placeholder">
                <div className="book-stack">
                  <div className="book book-1">📕</div>
                  <div className="book book-2">📗</div>
                  <div className="book book-3">📘</div>
                </div>
              </div>
            </div>

            <div className="floating-card card-2">
              <div className="card-icon">✨</div>
              <div className="card-label">NEW FEATURE</div>
              <div className="card-title">AI Notes</div>
              <div className="card-price">
                <span className="price-new">Beta</span>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="slide-indicators">
              <button className="indicator active">01</button>
              <button className="indicator">02</button>
              <button className="indicator">03</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-container">
          <h2 className="section-title">Why Choose CritiCore?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon" style={{ background: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-page {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Navigation */
        .navbar {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2.5rem;
        }

        .nav-menu a {
          text-decoration: none;
          color: #5a6c7d;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.3s;
        }

        .nav-menu a:hover {
          color: #667eea;
        }

        .nav-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-nav {
          padding: 0.75rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .btn-login {
          color: #667eea;
          background: white;
          border-color: #667eea;
        }

        .btn-login:hover {
          background: #667eea;
          color: white;
        }

        .btn-signup {
          background: #667eea;
          color: white;
        }

        .btn-signup:hover {
          background: #5568d3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 600px;
        }

        .hero-content {
          z-index: 10;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 5rem;
          font-weight: 800;
          color: #2c3e50;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #5a6c7d;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .btn-hero {
          display: inline-block;
          padding: 1.25rem 3rem;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 1px;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-hero:hover {
          background: #5568d3;
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(102, 126, 234, 0.5);
        }

        /* Hero Visual */
        .hero-visual {
          position: relative;
          height: 600px;
        }

        .main-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 500px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 300px 300px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .book-stack {
          display: flex;
          gap: 1.5rem;
          transform: translateY(-50px);
        }

        .book {
          font-size: 6rem;
          animation: float 3s ease-in-out infinite;
        }

        .book-1 {
          animation-delay: 0s;
        }

        .book-2 {
          animation-delay: 0.5s;
        }

        .book-3 {
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Floating Cards */
        .floating-card {
          position: absolute;
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 200px;
          animation: floatCard 4s ease-in-out infinite;
        }

        .card-1 {
          top: 50px;
          left: -50px;
        }

        .card-2 {
          bottom: 100px;
          right: -50px;
          animation-delay: 1s;
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .card-label {
          font-size: 0.75rem;
          color: #667eea;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.75rem;
        }

        .card-price {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .price-new {
          font-size: 1.25rem;
          font-weight: 700;
          color: #667eea;
        }

        .price-old {
          font-size: 1rem;
          color: #95a5a6;
          text-decoration: line-through;
        }

        /* Slide Indicators */
        .slide-indicators {
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .indicator {
          width: 50px;
          height: 50px;
          border: none;
          background: white;
          border-radius: 50%;
          font-weight: 700;
          color: #95a5a6;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .indicator.active {
          background: #667eea;
          color: white;
          transform: scale(1.1);
        }

        .indicator:hover {
          transform: scale(1.05);
        }

        /* Features Section */
        .features-section {
          padding: 6rem 2rem;
          background: white;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
          color: #2c3e50;
          margin-bottom: 4rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .feature-card {
          text-align: center;
          padding: 2.5rem;
          border-radius: 16px;
          background: #f8f9fa;
          transition: all 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #5a6c7d;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-visual {
            display: none;
          }

          .hero-description {
            margin: 0 auto 2.5rem;
          }

          .nav-menu {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .nav-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .btn-nav {
            padding: 0.6rem 1.25rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

