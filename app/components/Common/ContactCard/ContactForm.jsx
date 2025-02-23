// src/components/ContactForm.jsx
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { RocketIcon, SecurityIcon, SparkleIcon, ChartIcon } from "../../Icons/Icons";
import PrimaryButton from "../../Buttons/PrimaryButton";
import validateForm from "../../../lib/validation";
import { interests } from "../../Constant/ContactCardConstant";

const features = [
  { icon: RocketIcon, text: "10x Faster Development" },
  { icon: SparkleIcon, text: "AI-Powered Solutions" },
  { icon: ChartIcon, text: "Proven ROI Framework" },
  { icon: SecurityIcon, text: "Enterprise-Grade Security" },
];

function ContactForm({ setShowConfetti }) {
  const formInitialState = useMemo(() => ({
    name: "",
    email: "",
    interest: "",
    message: "",
    subscribeNewsletter: true,
  }), []);

  const [formData, setFormData] = useState(formInitialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setFormData(formInitialState);
    setFormErrors({});
  }, [formInitialState]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  }, [formErrors]);

  const handleSuccess = useCallback(() => {
    setShowConfetti(true);
    toast.success("Successfully submitted! We'll get back to you soon.", { duration: 5000 });
    setTimeout(() => {
      setShowConfetti(false);
      resetForm();
    }, 5000);
  }, [resetForm, setShowConfetti]);

  const handleError = useCallback((message) => {
    toast.error(message || "Please try again.", { duration: 5000 });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      handleError("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      handleSuccess();
    } catch (err) {
      handleError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputError = useCallback(
    (fieldName) =>
      formErrors[fieldName] ? (
        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1 ml-1">
          {formErrors[fieldName]}
        </motion.span>
      ) : null,
    [formErrors]
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <motion.div className="space-y-6 order-2 md:order-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
        <div className="space-y-4">
          <motion.span className="offer-tag">2024 Special Offer</motion.span>
          <h2 className="text-2xl font-bold text-gradient">Scale Smarter with Our Digital Blueprint</h2>
        </div>
        <ul className="space-y-4 hidden sm:block">
          {features.map(({ icon: Icon, text }, index) => (
            <motion.li key={index} className="flex items-center space-x-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + index * 0.1 }}>
              <div className="feature-icon">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-neutral-200">{text}</span>
            </motion.li>
          ))}
        </ul>
        <motion.div className="offer-box hidden sm:block">
          <p className="text-white/80 text-sm">
            ⭐️ LIMITED TIME: Free Tech Strategy Session
            <span className="block text-lg font-semibold text-gradient mt-3">Valued at $997</span>
          </p>
        </motion.div>
      </motion.div>

      <motion.form onSubmit={handleSubmit} className="contact-form order-1 md:order-2">
        <div className="space-y-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="input-label">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="input-field" />
              {getInputError("name")}
            </div>
            <div className="space-y-1.5">
              <label className="input-label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="input-field" />
              {getInputError("email")}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="input-label">Area of Interest</label>
            <select name="interest" value={formData.interest} onChange={handleChange} required className="input-field">
              <option value="" disabled>Select Your Interest</option>
              {interests.map((interest) => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </select>
            {getInputError("interest")}
          </div>
          <div className="space-y-1.5">
            <label className="input-label">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your business challenges..." rows="4" required className="input-field resize-none" />
            {getInputError("message")}
          </div>
          <div className="flex items-start space-x-2">
            <input type="checkbox" name="subscribeNewsletter" checked={formData.subscribeNewsletter} onChange={handleChange} id="newsletter-checkbox" className="checkbox" />
            <label htmlFor="newsletter-checkbox" className="text-neutral-300 text-xs">
              Keep me updated with weekly insights
              <span className="block mt-1 text-neutral-400">You can unsubscribe at any time.</span>
            </label>
          </div>
          <PrimaryButton type="submit" disabled={isSubmitting} withRipple withParticles size="large" variant="primary" className="w-full">
            {isSubmitting ? "Processing..." : "Get Instant Access"}
          </PrimaryButton>
        </div>
      </motion.form>
    </div>
  );
}

export default ContactForm;