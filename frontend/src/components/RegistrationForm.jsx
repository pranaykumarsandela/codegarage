import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utils/formValidation';
import '../styles/forms.css';
import '../styles/buttons.css';

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    language: '',
    pricingTier: 'early-bird'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      navigate('/payment', { state: { formData } });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-info-box">
        <div className="form-info-title">Registration Information</div>
        <div className="form-info-text">
          Fill in your details to register for Code Garage 2025. All fields are required.
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
        />
        {errors.email && <div className="form-error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          maxLength="10"
        />
        {errors.phone && <div className="form-error">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="institution" className="form-label">Institution</label>
        <input
          type="text"
          id="institution"
          name="institution"
          className="form-input"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Your college or university name"
        />
        {errors.institution && <div className="form-error">{errors.institution}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="language" className="form-label">Preferred Programming Language</label>
        <select
          id="language"
          name="language"
          className="form-select"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="">Select a language</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
        {errors.language && <div className="form-error">{errors.language}</div>}
      </div>

      <div className="form-divider"></div>

      <div className="form-group">
        <label className="form-label">Pricing Tier</label>
        <div className="form-radio-group">
          <div
            className={`form-radio-item ${formData.pricingTier === 'early-bird' ? 'selected' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, pricingTier: 'early-bird' }))}
          >
            <input
              type="radio"
              id="early-bird"
              name="pricingTier"
              value="early-bird"
              checked={formData.pricingTier === 'early-bird'}
              onChange={handleChange}
              className="form-radio-input"
            />
            <label htmlFor="early-bird" className="form-radio-label">
              <div style={{ fontWeight: 600 }}>Early Bird - ₹149</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Limited time offer
              </div>
            </label>
          </div>

          <div
            className={`form-radio-item ${formData.pricingTier === 'regular' ? 'selected' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, pricingTier: 'regular' }))}
          >
            <input
              type="radio"
              id="regular"
              name="pricingTier"
              value="regular"
              checked={formData.pricingTier === 'regular'}
              onChange={handleChange}
              className="form-radio-input"
            />
            <label htmlFor="regular" className="form-radio-label">
              <div style={{ fontWeight: 600 }}>Regular - ₹249</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Standard pricing
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className={`btn btn-primary btn-large btn-full ${isSubmitting ? 'btn-loading' : ''}`}
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Processing...' : 'Proceed to Payment'}</span>
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
