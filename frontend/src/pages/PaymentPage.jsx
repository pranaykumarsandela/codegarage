import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import StatusIndicator from '../components/StatusIndicator';
import '../styles/forms.css';
import '../styles/buttons.css';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!location.state || !location.state.formData) {
    return <Navigate to="/register" replace />;
  }

  const { formData } = location.state;
  const price = formData.pricingTier === 'early-bird' ? '149' : '249';
  const tierName = formData.pricingTier === 'early-bird' ? 'Early Bird' : 'Regular';

  const handlePayment = () => {
    setIsProcessing(true);
    setStatus('processing');

    setTimeout(() => {
      setStatus('paid');
      setIsProcessing(false);

      setTimeout(() => {
        navigate('/success', { state: { formData, price } });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="form-container" style={{ marginTop: '80px' }}>
      <div className="form-card glass-strong" style={{ maxWidth: '600px' }}>
        <div className="form-header">
          <h1 className="form-title gradient-text">Complete Payment</h1>
          <p className="form-subtitle">Review your registration details and complete the payment</p>
        </div>

        <StatusIndicator status={status} />

        <div className="form-info-box">
          <div className="form-info-title">Registration Summary</div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Name:</span>
              <span style={{ fontWeight: 600 }}>{formData.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Email:</span>
              <span style={{ fontWeight: 600 }}>{formData.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Phone:</span>
              <span style={{ fontWeight: 600 }}>{formData.phone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Institution:</span>
              <span style={{ fontWeight: 600 }}>{formData.institution}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Language:</span>
              <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{formData.language}</span>
            </div>
          </div>
        </div>

        <div className="form-divider"></div>

        <div style={{
          padding: '2rem',
          background: 'rgba(168, 85, 247, 0.05)',
          border: '2px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            {tierName} Pricing
          </div>
          <div style={{
            fontSize: '3rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ₹{price}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            One-time registration fee
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(6, 182, 212, 0.05)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--neon-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Mock UPI Payment
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            This is a UI demonstration. No actual payment will be processed.
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={handlePayment}
            className={`btn btn-primary btn-large btn-full ${isProcessing ? 'btn-loading' : ''}`}
            disabled={isProcessing || status === 'paid'}
          >
            <span>{isProcessing ? 'Processing Payment...' : status === 'paid' ? 'Payment Successful' : 'Pay with UPI'}</span>
          </button>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-outline btn-full"
            disabled={isProcessing}
          >
            <span>Back to Registration</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
