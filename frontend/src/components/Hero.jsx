import { Link } from 'react-router-dom';
import '../styles/hero.css';
import '../styles/buttons.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <div className="hero-content">
        <div className="hero-subtitle">IEEE SB OUCE Computer Society Presents</div>

        <h1 className="hero-title gradient-text">
          Code Garage 2025
        </h1>

        <p className="hero-description">
          A structured skill-development program designed to strengthen your programming
          and problem-solving abilities through guided learning, competitive assessments,
          and performance-based progression.
        </p>

        <div className="hero-features">
          <span className="feature-tag">3-Stage Learning Path</span>
          <span className="feature-tag">DSA Mastery</span>
          <span className="feature-tag">Competitive Programming</span>
          <span className="feature-tag">Expert Mentorship</span>
        </div>

        <div className="hero-cta">
          <Link to="/register">
            <button className="btn btn-primary btn-large">
              <span>Start Your Journey</span>
            </button>
          </Link>
          <a href="#about">
            <button className="btn btn-secondary btn-large">
              <span>Learn More</span>
            </button>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-card glass">
            <div className="stat-value">3</div>
            <div className="stat-label">Learning Stages</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-value">150+</div>
            <div className="stat-label">DSA Problems</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
