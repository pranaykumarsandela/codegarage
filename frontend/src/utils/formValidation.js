export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Please enter a valid name (minimum 2 characters)';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!formData.institution || formData.institution.trim().length === 0) {
    errors.institution = 'Please enter your institution name';
  }

  if (!formData.language) {
    errors.language = 'Please select a programming language';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
