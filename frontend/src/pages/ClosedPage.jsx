import { Link } from 'react-router-dom';
import '../styles/animations.css';
import '../styles/buttons.css';

function ClosedPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        opacity: 0.3
      }}></div>

      <div className="glass-strong animate-fadeInUp" style={{
        maxWidth: '600px',
        padding: '3rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(168, 85, 247, 0.1)',
          border: '2px solid rgba(168, 85, 247, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <svg
            style={{ width: '60px', height: '60px', color: 'var(--neon-purple)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(6, 182, 212, 0.8))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Registrations Closed
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          We're sorry, but registrations for Code Garage 2025 have been closed.
          The program has reached its maximum capacity.
        </p>

        <div className="glass" style={{
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            Want to stay updated?
          </div>
          <ul style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            lineHeight: '1.8',
            paddingLeft: '1.5rem'
          }}>
            <li>Follow us on social media for future programs</li>
            <li>Subscribe to our newsletter for updates</li>
            <li>Join our community to connect with current participants</li>
            <li>Check back for Code Garage 2026 announcements</li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/">
            <button className="btn btn-primary btn-large btn-full">
              <span>Back to Home</span>
            </button>
          </Link>
          <button className="btn btn-glass btn-full">
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClosedPage;
