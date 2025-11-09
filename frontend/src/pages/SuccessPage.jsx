import { useLocation, Navigate, Link } from 'react-router-dom';
import SuccessAnimation from '../components/SuccessAnimation';
import '../styles/animations.css';
import '../styles/buttons.css';

function SuccessPage() {
  const location = useLocation();

  if (!location.state || !location.state.formData) {
    return <Navigate to="/" replace />;
  }

  const { formData, price } = location.state;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="glass-strong animate-fadeInUp" style={{
        maxWidth: '600px',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <SuccessAnimation />

        <h1 className="gradient-text" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '1rem',
          textShadow: '0 0 40px rgba(16, 185, 129, 0.5)'
        }}>
          Registration Successful!
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Congratulations, {formData.name}! You have successfully registered for Code Garage 2025.
        </p>

        <div className="glass" style={{
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--neon-cyan)', fontWeight: 600, marginBottom: '1rem' }}>
            Registration Details
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Email:</span>
              <span style={{ fontWeight: 600 }}>{formData.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Language:</span>
              <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{formData.language}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Amount Paid:</span>
              <span style={{ fontWeight: 600, color: 'var(--neon-green)' }}>₹{price}</span>
            </div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(168, 85, 247, 0.05)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            What's Next?
          </div>
          <ul style={{
            textAlign: 'left',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            lineHeight: '1.8',
            paddingLeft: '1.5rem'
          }}>
            <li>Check your email for confirmation and program details</li>
            <li>Join our community Discord server</li>
            <li>Access the learning portal to begin Stage 1</li>
            <li>Connect with mentors and fellow participants</li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/">
            <button className="btn btn-primary btn-large btn-full">
              <span>Back to Home</span>
            </button>
          </Link>
          <button className="btn btn-glass btn-full" onClick={() => window.print()}>
            <span>Download Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
