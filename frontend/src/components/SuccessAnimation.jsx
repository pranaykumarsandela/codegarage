import { useEffect, useState } from 'react';

function SuccessAnimation() {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#10b981', '#f59e0b'];
    const pieces = [];

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        rotation: Math.random() * 360
      });
    }

    setConfetti(pieces);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer} className="animate-scaleIn">
        <svg
          style={styles.icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            ...styles.confetti,
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    minHeight: '150px'
  },
  iconContainer: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)',
    zIndex: 1
  },
  icon: {
    width: '60px',
    height: '60px',
    color: 'white'
  },
  confetti: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '2px',
    top: '-10px',
    animation: 'confetti 4s ease-out forwards',
    zIndex: 0
  }
};

export default SuccessAnimation;
