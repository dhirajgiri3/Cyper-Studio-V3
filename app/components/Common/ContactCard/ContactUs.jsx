import React, {
  useState,
  memo,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RocketIcon,
  SecurityIcon,
  SparkleIcon,
  ChartIcon,
} from "../../Icons/Icons"; // Assuming path is correct
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton"; // Assuming path is correct
import toast, { Toaster } from "react-hot-toast";
import { useWindowSize } from "react-use";
import {
  CheckCircle2Icon,
  ChevronLeftIcon,
  SendIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  CpuIcon,
  ServerIcon,
  WrenchIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  GlobeIcon,
  AwardIcon,
} from "lucide-react";

// --- Lazy Load Heavy Components ---
const FloatingLabels = lazy(() => import("./FloatingLabels"));
const ParticleBackground = lazy(() => import("./ParticleBackground"));
const ReactConfetti = lazy(() => import("react-confetti"));
const GlowingOrb = lazy(() => import("./GlowingOrb"));

// --- Constants ---
const CONTACT_EMAIL = "hello@cyperstudio.in";
const CONTACT_PHONE = "+91 95696 91483";
const CONTACT_PHONE_TEL = "+919569691483";
const CALENDLY_LINK = "https://calendly.com/business-cyperstudio/30min";

const SERVICES = [
  {
    id: "ecommerce",
    name: "E-Commerce Growth",
    description: "High-converting online stores & platform optimization.",
    icon: ShoppingBagIcon,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "edtech",
    name: "EdTech Innovation",
    description: "Engaging learning platforms & management systems.",
    icon: BookOpenIcon,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "ai",
    name: "AI & ML Integration",
    description: "Intelligent automation, data insights & custom models.",
    icon: CpuIcon,
    color: "green",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "saas",
    name: "SaaS Product Launch",
    description: "Scalable cloud applications from concept to market.",
    icon: ServerIcon,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "custom",
    name: "Custom Digital Solution",
    description: "Bespoke software tailored to your unique requirements.",
    icon: WrenchIcon,
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
  },
];

const features = [
  { icon: RocketIcon, text: "Accelerated Time-to-Market" },
  { icon: SparkleIcon, text: "AI-Driven Solution Design" },
  { icon: ChartIcon, text: "Measurable ROI & Growth Focus" },
  { icon: SecurityIcon, text: "Robust Security & Scalability" },
  { icon: GlobeIcon, text: "Global Delivery Capability" },
  { icon: AwardIcon, text: "Award-Winning Team" },
];

const FLOATING_LABELS = [
  { id: 1, text: "Client Focused", className: "label-support floating-slow text-purple-300" },
  { id: 2, text: "Reliable Partner", className: "label-reliability floating-medium text-blue-300" },
  { id: 3, text: "Innovative Tech", className: "label-tech floating-fast text-green-300" },
  { id: 4, text: "Cloud Experts", className: "label-cloud floating-medium text-amber-300" },
  { id: 5, text: "Scalable Growth", className: "label-scale floating-slow text-cyan-300" },
  { id: 6, text: "Secure by Design", className: "label-security floating-medium text-pink-300" },
  { id: 7, text: "Agile Delivery", className: "label-speed floating-fast text-teal-300" },
  { id: 8, text: "Proven Results", className: "label-roi floating-medium text-orange-300" },
  { id: 9, text: "AI Excellence", className: "label-ai floating-slow text-emerald-300" },
  { id: 10, text: "24/7 Support", className: "label-availability floating-fast text-indigo-300" },
];

// --- Validation Logic ---
const validateForm = (formData, step) => {
  const errors = {};
  if (step === 1) {
    if (!formData.service) errors.service = "Please select a service area";
  } else if (step === 2) {
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.service) errors.service = "Service selection is missing";
    if (!formData.message.trim()) errors.message = "Project details are required";
    else if (formData.message.trim().length < 15)
      errors.message = "Please provide more details (15+ characters)";
    if (
      formData.phone &&
      !/^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
        formData.phone.replace(/[-.\s()]/g, "")
      )
    ) {
      errors.phone = "Invalid phone number";
    }
  }
  return errors;
};

// --- Component ---
function ContactUs() {
  const { width, height } = useWindowSize();
  const [activeStep, setActiveStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const formInitialState = useMemo(
    () => ({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
      subscribeNewsletter: true,
    }),
    []
  );

  const [formData, setFormData] = useState(formInitialState);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(formInitialState);
    setFormErrors({});
    setActiveStep(1);
    setIsSubmitting(false);
    setShowConfetti(false);
    setFormTouched(false);
    document.getElementById("contact-form-container")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [formInitialState]);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: null }));
      }
      setFormTouched(true);
    },
    [formErrors]
  );

  // Toast styling
  const toastStyles = {
    success: {
      style: {
        background: "rgba(34, 197, 94, 0.9)",
        backdropFilter: "blur(14px)",
        color: "white",
        padding: "16px 24px",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
      },
      duration: 7000,
      icon: "🌟",
    },
    error: {
      style: {
        background: "rgba(239, 68, 68, 0.9)",
        backdropFilter: "blur(14px)",
        color: "white",
        padding: "16px 24px",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
      },
      duration: 7000,
      icon: "⚠️",
    },
  };

  // Success and error handlers
  const handleSuccess = useCallback(() => {
    setShowConfetti(true);
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Inquiry Sent Successfully!</span>
        <span className="text-sm opacity-90">Expect a response soon.</span>
      </div>,
      toastStyles.success
    );
    setActiveStep(3);
    const timer = setTimeout(() => setShowConfetti(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleError = useCallback(
    (errorMessage) => {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Submission Failed</span>
          <span className="text-sm opacity-90">
            {errorMessage || "Please check your inputs."}
          </span>
        </div>,
        toastStyles.error
      );
    },
    []
  );

  // Step navigation
  const handleServiceSelect = useCallback((serviceId) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
    setFormErrors({});
    setActiveStep(2);
    setFormTouched(true);
  }, []);

  const handlePrevStep = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    setFormErrors({});
  }, []);

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData, 2);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      handleError("Please correct the highlighted fields.");
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus({ preventScroll: true });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xqaqeljb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }

      handleSuccess();
    } catch (err) {
      handleError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input error display
  const getInputError = useCallback(
    (fieldName) => (
      <motion.span
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="text-red-400 text-xs mt-1.5 ml-2 block"
        role="alert"
      >
        {formErrors[fieldName]}
      </motion.span>
    ),
    [formErrors]
  );

  const inputClassName = useCallback(
    (fieldName) => `
      w-full px-4 py-3 rounded-lg border transition-all duration-300
      text-sm bg-neutral-900/30 text-white placeholder-neutral-500
      focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-black
      ${
        formErrors[fieldName]
          ? "border-red-500 focus:ring-red-500"
          : "border-neutral-700 focus:ring-blue-500 focus:border-blue-500"
      }
      hover:bg-neutral-800/50 disabled:opacity-50 disabled:cursor-not-allowed
      shadow-sm backdrop-blur-md
    `,
    [formErrors]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
    exit: { opacity: 0, y: -30 },
  };

  const serviceCardVariants = {
    initial: { scale: 1, y: 0, rotateX: 0 },
    hover: {
      scale: 1.06,
      y: -10,
      rotateX: 5,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.4, type: "spring" },
    },
    tap: { scale: 0.94 },
    selected: {
      scale: 1.03,
      borderColor: "rgba(96, 165, 250, 1)",
      boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.6)",
    },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-4 bg-gradient-to-br from-neutral-950 via-black to-indigo-950">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15),transparent_70%)]"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <Suspense fallback={<div className="bg-neutral-900/50" />}>
          <ParticleBackground particleColor="#a1a1aa" particleDensity={8} />
        </Suspense>
        <Suspense fallback={null}>
          <FloatingLabels floatingLabels={FLOATING_LABELS} />
        </Suspense>
        <Suspense fallback={null}>
          {formTouched && (
            <GlowingOrb
              position={formData.service === "ai" ? "bottom-right" : "top-left"}
              color={
                SERVICES.find((s) => s.id === formData.service)?.color || "blue"
              }
              intensity={0.8}
              pulse={isSubmitting}
            />
          )}
        </Suspense>
      </div>

      {/* Confetti */}
      {showConfetti && width && height && (
        <Suspense fallback={null}>
          <ReactConfetti
            width={width}
            height={height}
            numberOfPieces={200}
            recycle={false}
            colors={["#3b82f6", "#a855f7", "#22c55e", "#facc15", "#ec4899"]}
            gravity={0.15}
            initialVelocityY={25}
            initialVelocityX={15}
            tweenDuration={10000}
            className="!z-[100]"
          />
        </Suspense>
      )}

      {/* Main Card */}
      <motion.div
        className="relative w-full max-w-7xl rounded-3xl overflow-hidden backdrop-blur-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-2xl z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        id="contact-main-card"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Info */}
          <div className="p-8 lg:p-12 bg-gradient-to-b from-neutral-900/90 to-black/90 flex flex-col order-2 lg:order-1 min-h-[600px]">
            <motion.div className="flex flex-col justify-between flex-grow space-y-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <motion.span
                  className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 text-sm font-semibold border border-blue-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  Collaborate with Us
                </motion.span>
                <motion.h2
                  className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 leading-tight"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Bring Your Vision to Life
                </motion.h2>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  We craft innovative digital solutions tailored to your goals. Let's create something extraordinary.
                </p>
              </motion.div>

              <motion.ul variants={itemVariants} className="space-y-4">
                {features.map(({ icon: Icon, text }, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-4 group"
                    whileHover={{ x: 8, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:bg-blue-500/30 transition-all"
                      whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                    >
                      <Icon className="w-6 h-6 text-blue-300" />
                    </motion.div>
                    <span className="text-neutral-200 text-base">{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={itemVariants} className="space-y-6">
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-purple-500/40 shadow-lg"
                  whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
                >
                  <p className="text-white text-lg font-semibold">Free Consultation</p>
                  <p className="text-neutral-300 text-sm mb-4">
                    Get expert insights to kickstart your project.
                  </p>
                  <a
                    href={CALENDLY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium shadow-md"
                  >
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Schedule Now
                  </a>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/80 text-neutral-200 text-sm font-medium border border-neutral-700/50"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    {CONTACT_PHONE}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/80 text-neutral-200 text-sm font-medium border border-neutral-700/50"
                  >
                    <MailIcon className="w-5 h-5" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div
            id="contact-form-container"
            className="p-8 lg:p-12 bg-gradient-to-b from-black/90 to-neutral-900/90 order-1 lg:order-2"
          >
            {/* Progress Indicator */}
            {activeStep < 3 && (
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {[1, 2].map((step) => (
                  <motion.div
                    key={step}
                    className={`h-2 rounded-full transition-all duration-700 ${
                      step === activeStep
                        ? "w-12 bg-gradient-to-r from-blue-500 to-purple-500"
                        : step < activeStep
                        ? "w-8 bg-green-500"
                        : "w-8 bg-neutral-600/50"
                    }`}
                    animate={
                      step === activeStep
                        ? { scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity } }
                        : {}
                    }
                  />
                ))}
                <span className="text-sm text-neutral-300">Step {activeStep} of 2</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div variants={itemVariants} className="text-center">
                    <h3 className="text-3xl font-bold text-white">
                      Select Your Project Type
                    </h3>
                    <p className="text-neutral-300 text-base mt-2">
                      Choose a service to start your journey.
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    variants={itemVariants}
                  >
                    {SERVICES.map((service) => (
                      <motion.div
                        key={service.id}
                        className={`p-6 rounded-2xl border cursor-pointer bg-gradient-to-br ${
                          formData.service === service.id
                            ? `${service.gradient} border-${service.color}-500/80`
                            : "from-neutral-800/50 to-neutral-900/50 border-neutral-700/50 hover:border-neutral-600"
                        } backdrop-blur-md shadow-lg`}
                        onClick={() => handleServiceSelect(service.id)}
                        variants={serviceCardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        animate={formData.service === service.id ? "selected" : "initial"}
                        role="radio"
                        aria-checked={formData.service === service.id}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`p-3 rounded-lg bg-${service.color}-500/30`}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                          >
                            <service.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{service.name}</h4>
                            <p className="text-neutral-300 text-sm">{service.description}</p>
                          </div>
                        </div>
                        {formData.service === service.id && (
                          <motion.div
                            className="absolute top-4 right-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle2Icon className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <PrimaryButton
                      onClick={() => formData.service && setActiveStep(2)}
                      disabled={!formData.service}
                      className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Continue
                    </PrimaryButton>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Form Details */}
              {activeStep === 2 && (
                <motion.form
                  key="step2"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center text-blue-400 hover:text-blue-300 text-sm mb-6"
                      whileHover={{ x: -5 }}
                    >
                      <ChevronLeftIcon className="w-5 h-5 mr-2" />
                      Back to Services
                    </motion.button>
                    <h3 className="text-2xl font-bold text-white">
                      Share Your Project Details
                    </h3>
                    <p className="text-neutral-300 text-base mt-2">
                      Service: <span className="text-blue-300">{SERVICES.find((s) => s.id === formData.service)?.name}</span>
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <motion.label
                        htmlFor="name"
                        className={`absolute -top-2 left-3 px-2 text-sm text-neutral-300 bg-neutral-900/80 transition-all duration-300 ${
                          formData.name ? "scale-90" : "scale-100"
                        }`}
                        animate={{ y: formData.name ? -10 : 0 }}
                      >
                        Name <span className="text-red-400">*</span>
                      </motion.label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className={inputClassName("name")}
                        disabled={isSubmitting}
                      />
                      <AnimatePresence>{formErrors.name && getInputError("name")}</AnimatePresence>
                    </div>

                    <div className="relative">
                      <motion.label
                        htmlFor="email"
                        className={`absolute -top-2 left-3 px-2 text-sm text-neutral-300 bg-neutral-900/80 transition-all duration-300 ${
                          formData.email ? "scale-90" : "scale-100"
                        }`}
                        animate={{ y: formData.email ? -10 : 0 }}
                      >
                        Email <span className="text-red-400">*</span>
                      </motion.label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className={inputClassName("email")}
                        disabled={isSubmitting}
                      />
                      <AnimatePresence>{formErrors.email && getInputError("email")}</AnimatePresence>
                    </div>

                    <div className="relative">
                      <motion.label
                        htmlFor="company"
                        className={`absolute -top-2 left-3 px-2 text-sm text-neutral-300 bg-neutral-900/80 transition-all duration-300 ${
                          formData.company ? "scale-90" : "scale-100"
                        }`}
                        animate={{ y: formData.company ? -10 : 0 }}
                      >
                        Company (Optional)
                      </motion.label>
                      <input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder=" "
                        className={inputClassName("company")}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="relative">
                      <motion.label
                        htmlFor="phone"
                        className={`absolute -top-2 left-3 px-2 text-sm text-neutral-300 bg-neutral-900/80 transition-all duration-300 ${
                          formData.phone ? "scale-90" : "scale-100"
                        }`}
                        animate={{ y: formData.phone ? -10 : 0 }}
                      >
                        Phone (Optional)
                      </motion.label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" "
                        className={inputClassName("phone")}
                        disabled={isSubmitting}
                      />
                      <AnimatePresence>{formErrors.phone && getInputError("phone")}</AnimatePresence>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <motion.label
                      htmlFor="message"
                      className={`absolute -top-2 left-3 px-2 text-sm text-neutral-300 bg-neutral-900/80 transition-all duration-300 ${
                        formData.message ? "scale-90" : "scale-100"
                      }`}
                      animate={{ y: formData.message ? -10 : 0 }}
                    >
                      Project Details <span className="text-red-400">*</span>
                    </motion.label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      rows="6"
                      required
                      className={`${inputClassName("message")} resize-y min-h-[150px]`}
                      disabled={isSubmitting}
                    />
                    <AnimatePresence>{formErrors.message && getInputError("message")}</AnimatePresence>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-6">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-500 border-neutral-600 rounded focus:ring-blue-500 focus:ring-offset-black"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-neutral-200">
                        Subscribe to our newsletter for updates
                      </span>
                    </label>

                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <motion.span
                            className="h-6 w-6 border-3 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <SendIcon className="w-6 h-6" />
                          Send Inquiry
                        </span>
                      )}
                    </PrimaryButton>
                  </motion.div>
                </motion.form>
              )}

              {/* Step 3: Success */}
              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  className="flex flex-col items-center justify-center text-center py-16"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemVariants}
                    className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center mb-8 border-2 border-green-400/50"
                    animate={{ scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } }}
                  >
                    <CheckCircle2Icon className="w-14 h-14 text-green-400" />
                  </motion.div>

                  <motion.h3
                    variants={itemVariants}
                    className="text-3xl font-bold text-white mb-4"
                  >
                    Thank You, {formData.name.split(" ")[0] || "Visionary"}!
                  </motion.h3>

                  <motion.p
                    variants={itemVariants}
                    className="text-neutral-300 text-lg mb-8 max-w-lg"
                  >
                    Your inquiry for{" "}
                    <span className="text-white font-semibold">
                      {SERVICES.find((s) => s.id === formData.service)?.name}
                    </span>{" "}
                    is on its way. We'll reach out to{" "}
                    <span className="text-white font-semibold">{formData.email}</span> within 24 hours.
                  </motion.p>

                  <motion.div variants={itemVariants} className="space-y-4 w-full max-w-md">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white text-sm font-medium"
                      >
                        <PhoneIcon className="w-5 h-5" />
                        Call Us
                      </a>
                      <a
                        href={CALENDLY_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium"
                      >
                        <CalendarIcon className="w-5 h-5" />
                        Schedule a Call
                      </a>
                    </div>
                    <PrimaryButton
                      onClick={resetForm}
                      className="w-full py-3 text-lg bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800"
                    >
                      Submit Another Inquiry
                    </PrimaryButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default memo(ContactUs);