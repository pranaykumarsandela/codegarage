import RegistrationForm from '../components/RegistrationForm';
import '../styles/forms.css';

function RegistrationPage() {
  return (
    <div className="form-container centered">
      <div className="form-card glass-strong">
        <div className="form-header">
          <h1 className="form-title gradient-text">Join Code Garage 2025</h1>
          <p className="form-subtitle">
            Start your journey to becoming a problem-solving expert
          </p>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
