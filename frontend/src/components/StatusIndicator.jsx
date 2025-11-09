import '../styles/animations.css';

function StatusIndicator({ status = 'pending' }) {
  const statusConfig = {
    pending: {
      color: '#f59e0b',
      label: 'Payment Pending',
      description: 'Complete the payment to confirm your registration'
    },
    processing: {
      color: '#3b82f6',
      label: 'Processing',
      description: 'Your payment is being processed'
    },
    paid: {
      color: '#10b981',
      label: 'Payment Successful',
      description: 'Your registration is confirmed'
    },
    failed: {
      color: '#ef4444',
      label: 'Payment Failed',
      description: 'Please try again or contact support'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div style={styles.container}>
      <div style={{ ...styles.indicator, backgroundColor: config.color }}>
        <div style={styles.pulse}></div>
      </div>
      <div style={styles.content}>
        <div style={styles.label}>{config.label}</div>
        <div style={styles.description}>{config.description}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    marginBottom: '1.5rem'
  },
  indicator: {
    position: 'relative',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    flexShrink: 0
  },
  pulse: {
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    border: '2px solid currentColor',
    opacity: 0.3,
    animation: 'pulse 2s ease-in-out infinite'
  },
  content: {
    flex: 1
  },
  label: {
    fontWeight: 600,
    marginBottom: '0.25rem'
  },
  description: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)'
  }
};

export default StatusIndicator;
