import { Link } from "react-router-dom";
import "../styles/hero.css";
import "../styles/buttons.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="floating-element purple"></div>
        <div className="floating-element cyan"></div>
        <div className="floating-element pink"></div>
      </div>

      <div className="hero-content">
        <div className="hero-subtitle">IEEE SB OUCE Computer Society Presents</div>

        <h1 className="hero-title gradient-text">Code Garage 2025</h1>

        <p className="hero-description">
          Structured learning, guided practice, and performance-driven growth.
        </p>

        <div className="hero-cta">
          <Link to="/register">
            <button className="btn btn-primary btn-large">
              <span>Start Your Journey</span>
            </button>
          </Link>

          <a href="#about">
             <button className="btn-light-yellow btn-large">
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
