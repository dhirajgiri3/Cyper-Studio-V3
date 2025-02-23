// src/utils/validation.js
const validateForm = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Name is required";
  if (!formData.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Invalid email format";
  if (!formData.interest) errors.interest = "Please select an area of interest";
  if (!formData.message.trim()) errors.message = "Message is required";
  return errors;
};

export default validateForm;
