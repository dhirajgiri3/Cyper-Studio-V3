import React, { useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { RocketIcon, SecurityIcon, SparkleIcon, ChartIcon } from '../../Icons/Icons';
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import toast from 'react-hot-toast';
import { useWindowSize } from 'react-use';

// Lazy load heavy components
const GravityLabels = lazy(() => import('./GravityLabels'));
const ParticleBackground = lazy(() => import('./ParticleBackground'));
const ReactConfetti = lazy(() => import('react-confetti'));

// Constants moved outside component
const staticFloatingLabels = [
  { id: 1, text: "24/7 Support", className: "label-support" },
  { id: 2, text: "99.9% Uptime", className: "label-reliability" },
  { id: 3, text: "AI Powered", className: "label-tech" },
  { id: 4, text: "Cloud Native", className: "label-cloud" },
  { id: 5, text: "Scalable", className: "label-scale" },
  { id: 6, text: "ISO Certified", className: "label-security" },
  { id: 7, text: "Fast Delivery", className: "label-speed" },
  { id: 8, text: "Best ROI", className: "label-roi" },
  { id: 9, text: "Agile Teams", className: "label-agile" },
  { id: 10, text: "Global Reach", className: "label-global" },
  { id: 11, text: "Innovation", className: "label-innovation" },
  { id: 12, text: "Expert Team", className: "label-expertise" }
];

const interests = [
  "Digital Transformation",
  "Cloud Migration",
  "AI & ML Solutions",
  "Cybersecurity",
  "Blockchain",
  "IoT & Edge Computing",
  "DevOps & Automation",
  "Data Analytics",
  "UI/UX Design",
  "Mobile & Web Development"
];

const features = [
  { icon: RocketIcon, text: "10x Faster Development" },
  { icon: SparkleIcon, text: "AI-Powered Solutions" },
  { icon: ChartIcon, text: "Proven ROI Framework" },
  { icon: SecurityIcon, text: "Enterprise-Grade Security" }
];

const validateForm = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }
  if (!formData.interest) errors.interest = 'Please select an area of interest';
  if (!formData.message.trim()) errors.message = 'Message is required';
  return errors;
};

function ContactCard() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formInitialState = useMemo(() => ({
    name: "",
    email: "",
    interest: "",
    message: "",
    subscribeNewsletter: true
  }), []);

  const [formData, setFormData] = useState(formInitialState);

  const resetForm = useCallback(() => {
    setFormData(formInitialState);
    setFormErrors({});
  }, [formInitialState]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [formErrors]);

  // Custom toast styles
  const toastStyles = {
    success: {
      style: {
        background: 'rgba(16, 185, 129, 0.9)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        animation: 'toast-enter 0.3s ease-out',
      },
      duration: 5000,
      icon: '✨',
    },
    error: {
      style: {
        background: 'rgba(239, 68, 68, 0.9)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        animation: 'toast-enter 0.3s ease-out',
      },
      duration: 5000,
      icon: '❌',
    },
  };

  // Enhanced success feedback
  const handleSuccess = useCallback(() => {
    setShowConfetti(true);
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-medium">Successfully submitted! 🎉</span>
        <span className="text-sm opacity-90">We'll get back to you soon.</span>
      </div>,
      toastStyles.success
    );

    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
      resetForm();
    }, 5000);
  }, [resetForm]);

  // Enhanced error feedback
  const handleError = useCallback((errorMessage) => {
    toast.error(
      <div className="flex flex-col gap-1">
        <span className="font-medium">Submission Failed</span>
        <span className="text-sm opacity-90">{errorMessage || 'Please try again.'}</span>
      </div>,
      toastStyles.error
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      handleError('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Network error"));
          }
        }, 1500);
      });

      handleSuccess();
    } catch (err) {
      handleError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputError = useCallback((fieldName) => {
    return formErrors[fieldName] ? (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1 ml-1"
      >
        {formErrors[fieldName]}
      </motion.span>
    ) : null;
  }, [formErrors]);

  const inputClassName = useCallback((fieldName) => `
    w-full px-6 py-4 rounded-2xl bg-neutral-800/50 border
    ${formErrors[fieldName]
      ? 'border-red-500/50 focus:ring-primary/50'
      : 'border-neutral-700/30 focus:ring-primary/50 focus:border-primary/50'
    }
    text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2
    transition-all duration-300 backdrop-blur-md hover:bg-neutral-800/50
    hover:border-neutral-600/50 text-sm
  `, [formErrors]);

  // Add loading pulse animation to form inputs
  const enhancedInputClassName = useCallback((fieldName) => `
    ${inputClassName(fieldName)}
    focus:ring-primary/20
    transition-all duration-300 ease-custom-spring
    active:scale-[0.98]
  `, [inputClassName]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div
      className="relative min-h-screen md:h-full flex items-center justify-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ minHeight: '100vh' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070c] via-neutral-900/85 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,78,232,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,bg-purple-500/30,transparent_70%)] blur-3xl" />
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      </div>

      {showConfetti && (
        <Suspense fallback={null}>
          <ReactConfetti
            width={width}
            height={height}
            numberOfPieces={100}
            recycle={false}
            colors={['#60A5FA', '#A855F7']}
            gravity={0.2}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <div className="z-[15] absolute inset-0 w-full h-full pointer-events-auto" style={{ minHeight: '100vh' }}>
          <GravityLabels labels={staticFloatingLabels.map(label => label.text)} />
        </div>
      </Suspense>

      {/* Main content */}
      <motion.div
        className="relative w-full max-w-7xl rounded-2xl xs:rounded-3xl md:rounded-[2.5rem] overflow-hidden
          my-4 md:my-6 lg:my-8 mb-48 mx-auto backdrop-blur-3xl z-20"
        variants={containerVariants}
      >
        {/* Enhanced glass effect */}
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] to-purple-500/[0.07]" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Left column with improved spacing and typography */}
          <motion.div
            className="space-y-6 sm:space-y-8 lg:space-y-10 overflow-hidden order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.span
                className="inline-block px-4 sm:px-6 py-2 rounded-full bg-blue-500/10
                  text-blue-200 text-xs font-semibold border border-blue-500/20
                  backdrop-blur-2xl"
              >
                2024 Special Offer
              </motion.span>
              <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent
                bg-gradient-to-r from-white via-blue-100 to-white/90 leading-tight tracking-tight">
                Scale Smarter with Our Digital Blueprint
              </h2>
            </div>

            {/* Enhanced features list */}
            <ul className="space-y-4 sm:space-y-6 hidden sm:block">
              {features.map(({ icon: Icon, text }, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-4 text-neutral-200 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="p-2 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20
                    transition-all duration-300 border border-blue-500/20">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 filter drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
                  </div>
                  <span className="text-sm">{text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Enhanced offer box */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl
                bg-gradient-to-br from-blue-800/15 to-dark/10 border border-purple-800/10
                backdrop-blur-xl hidden sm:block transition-transform duration-300"
            >
              <p className="text-white/80 text-sm">
                ⭐️ LIMITED TIME: Free Tech Strategy Session
                <span className="block text-white font-semibold mt-3
                  text-lg bg-clip-text text-transparent
                  bg-gradient-to-r from-blue-400 to-purple-400">
                  Valued at $997
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Form with improved styling */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 relative order-1 md:order-2
              bg-gradient-to-br from-neutral-800/60 to-neutral-900/60
              p-5 xs:p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl
              border border-white/10 backdrop-blur-3xl
              shadow-[0_0_40px_rgba(0,0,0,0.07)] overflow-y-auto
              max-h-[85vh] md:max-h-none transition-all duration-500"
          >
            <div className="space-y-6 sm:space-y-8">
              {/* Responsive grid for name and email */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-6">
                {/* Name input with responsive spacing */}
                <div className="space-y-1.5 xs:space-y-2">
                  <label className="text-xs xs:text-sm font-medium text-neutral-300 ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={`${enhancedInputClassName("name")}
                      px-4 xs:px-6 py-3 xs:py-4 text-xs xs:text-sm`}
                  />
                  {getInputError("name")}
                </div>

                {/* Email input with responsive spacing */}
                <div className="space-y-1.5 xs:space-y-2">
                  <label className="text-xs xs:text-sm font-medium text-neutral-300 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className={`${enhancedInputClassName("email")}
                      px-4 xs:px-6 py-3 xs:py-4 text-xs xs:text-sm`}
                  />
                  {getInputError("email")}
                </div>
              </div>

              {/* Interest select with responsive spacing */}
              <div className="space-y-1.5 xs:space-y-2">
                <label className="text-xs xs:text-sm font-medium text-neutral-300 ml-1">
                  Area of Interest
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className={`${enhancedInputClassName(
                    "interest"
                  )} cursor-pointer hover:border-primary/30 px-4 xs:px-6 py-3 xs:py-4 text-xs xs:text-sm`}
                >
                  <option value="" disabled>
                    Select Your Interest
                  </option>
                  {interests.map((interest) => (
                    <option
                      key={interest}
                      value={interest}
                      className="bg-neutral-800"
                    >
                      {interest}
                    </option>
                  ))}
                </select>
                {getInputError("interest")}
              </div>

              {/* Message textarea with responsive spacing */}
              <div className="space-y-1.5 xs:space-y-2">
                <label className="text-xs xs:text-sm font-medium text-neutral-300 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business challenges..."
                  rows="4"
                  required
                  className={`${enhancedInputClassName("message")} resize-none px-4 xs:px-6 py-3 xs:py-4 text-xs xs:text-sm`}
                />
                {getInputError("message")}
              </div>

              {/* Newsletter checkbox with responsive spacing */}
              <div className="flex items-start space-x-2 xs:space-x-3 py-1 xs:py-2">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  id="newsletter-checkbox"
                  className="h-5 w-5 rounded-md bg-neutral-800/80 border-neutral-600
                    text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent"
                />
                <label
                  htmlFor="newsletter-checkbox"
                  className="text-neutral-300 text-xs xs:text-sm leading-tight"
                >
                  Keep me updated with weekly insights on digital transformation
                  <span className="block mt-1 text-neutral-400 text-xs">
                    You can unsubscribe at any time. Privacy policy
                  </span>
                </label>
              </div>

              {/* Submit button with responsive width */}
              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                withRipple={true}
                withParticles={true}
                size="large"
                variant="primary"
                className="w-full text-sm xs:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <motion.span
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Get Instant Access</span>
                  </span>
                )}
              </PrimaryButton>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(ContactCard);
