import RegistrationForm from '../components/RegistrationForm';
import { useState } from 'react';
import '../styles/forms.css';

function RegistrationPage() {
  const [hideHeader, setHideHeader] = useState(false);

  return (
    <div className="form-container centered">
      <div className="form-card glass-strong">

        {/* HEADER → hide during payment & success */}
        {!hideHeader && (
          <div className="form-header">
            <h1 className="form-title gradient-text">Join Code Garage 2025</h1>
            <p className="form-subtitle">
              Start your journey to becoming a problem-solving expert
            </p>
          </div>
        )}

        <RegistrationForm
          onStateChange={({ showPayment, paymentSuccess }) => {
            setHideHeader(showPayment || paymentSuccess);
          }}
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
