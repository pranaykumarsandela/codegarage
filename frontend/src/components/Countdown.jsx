import { useCountdown } from '../hooks/useCountdown';
import '../styles/countdown.css';

function Countdown({ label, targetDate, badge, price, info }) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="countdown-card glass-strong hover-lift">
      <div className="countdown-label">
        <span className="countdown-label-text">{label}</span>
        {badge && <span className="countdown-badge">{badge}</span>}
      </div>

      {!timeLeft.isExpired ? (
        <>
          <div className="countdown-timer">
            <div className="time-unit">
              <div className="time-value">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="time-label">Days</div>
            </div>
            <div className="countdown-divider">:</div>
            <div className="time-unit">
              <div className="time-value">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="time-label">Hours</div>
            </div>
            <div className="countdown-divider">:</div>
            <div className="time-unit">
              <div className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="time-label">Minutes</div>
            </div>
            <div className="countdown-divider">:</div>
            <div className="time-unit">
              <div className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="time-label">Seconds</div>
            </div>
          </div>

          {price && (
            <div className="countdown-info">
              <div className="countdown-price">₹{price}</div>
              {info && <p>{info}</p>}
            </div>
          )}
        </>
      ) : (
        <div className="countdown-expired">
          This offer has expired
        </div>
      )}
    </div>
  );
}

export default Countdown;
