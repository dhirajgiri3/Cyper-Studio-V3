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
  ChevronRightIcon,
  SendIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  CpuIcon,
  ServerIcon,
  WrenchIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  CheckIcon,
  GlobeIcon,
  AwardIcon,
} from "lucide-react";

// --- Lazy Load Heavy Components ---
// const FloatingLabels = lazy(() => import("./FloatingLabels"));
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
    colorRgb: "139, 92, 246",
  },
  {
    id: "edtech",
    name: "EdTech Innovation",
    description: "Engaging learning platforms & management systems.",
    icon: BookOpenIcon,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    colorRgb: "59, 130, 246",
  },
  {
    id: "ai",
    name: "AI & ML Integration",
    description: "Intelligent automation, data insights & custom models.",
    icon: CpuIcon,
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    colorRgb: "16, 185, 129",
  },
  {
    id: "saas",
    name: "SaaS Product Launch",
    description: "Scalable cloud applications from concept to market.",
    icon: ServerIcon,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    colorRgb: "245, 158, 11",
  },
  {
    id: "custom",
    name: "Custom Digital Solution",
    description: "Bespoke software tailored to your unique requirements.",
    icon: WrenchIcon,
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    colorRgb: "6, 182, 212",
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
  {
    id: 1,
    text: "Client Focused",
    className: "label-support floating-slow text-purple-300",
  },
  {
    id: 2,
    text: "Reliable Partner",
    className: "label-reliability floating-medium text-blue-300",
  },
  {
    id: 3,
    text: "Innovative Tech",
    className: "label-tech floating-fast text-green-300",
  },
  {
    id: 4,
    text: "Cloud Experts",
    className: "label-cloud floating-medium text-amber-300",
  },
  {
    id: 5,
    text: "Scalable Growth",
    className: "label-scale floating-slow text-cyan-300",
  },
  {
    id: 6,
    text: "Secure by Design",
    className: "label-security floating-medium text-pink-300",
  },
  {
    id: 7,
    text: "Agile Delivery",
    className: "label-speed floating-fast text-teal-300",
  },
  {
    id: 8,
    text: "Proven Results",
    className: "label-roi floating-medium text-orange-300",
  },
  {
    id: 9,
    text: "AI Excellence",
    className: "label-ai floating-slow text-emerald-300",
  },
  {
    id: 10,
    text: "24/7 Support",
    className: "label-availability floating-fast text-indigo-300",
  },
];

// --- Validation Logic ---
const validateForm = (formData, step) => {
  const errors = {};
  if (step === 1) {
    if (!formData.service) errors.service = "Please select a service area";
  } else if (step === 2) {
    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Service validation
    if (!formData.service) {
      errors.service = "Service selection is missing";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Project details are required";
    } else if (formData.message.trim().length < 15) {
      errors.message = "Please provide more details (15+ characters)";
    }

    // Phone validation (optional field)
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

  // Log active step changes
  useEffect(() => {
    console.log("Active step changed to:", activeStep);

    // Debug the rendering of steps
    if (activeStep === 2) {
      console.log("Step 2 should be rendering now");
      console.log("Current form data:", formData);
    }
  }, [activeStep, formData]);

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

  const handleError = useCallback((errorMessage) => {
    toast.error(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Submission Failed</span>
        <span className="text-sm opacity-90">
          {errorMessage || "Please check your inputs."}
        </span>
      </div>,
      toastStyles.error
    );
  }, []);

  // Step navigation functions

  const handlePrevStep = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    setFormErrors({});
  }, []);

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted, current step:", activeStep);

    // Validate form data
    const errors = validateForm(formData, 2);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      handleError("Please correct the highlighted fields.");

      // Focus on the first field with an error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus({ preventScroll: true });
      }
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    // Prepare form data with additional metadata
    const formDataToSubmit = {
      ...formData,
      _subject: `New ${formData.service} Inquiry from ${formData.name}`,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/xqaqeljb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataToSubmit),
      });

      // Handle response
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      // Handle success
      handleSuccess();

      // Log success (for debugging)
      console.log("Form submitted successfully");
    } catch (err) {
      // Handle error
      console.error("Form submission error:", err);
      handleError(err.message || "Network error. Please try again.");
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  // Animation variants for service cards

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

  // Spotlight animation
  const spotlightVariants = {
    animate: {
      scale: [1, 1.1, 1],
      x: [-20, 20, -20],
      y: [-20, 20, -20],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Debug render
  console.log(
    "ContactUs rendering with activeStep:",
    activeStep,
    "and formData:",
    formData
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-4 bg-gradient-to-br from-neutral-950 via-black to-indigo-950">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Spotlight Effect */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.3),rgba(147,51,234,0.2),transparent_70%)] blur-3xl"
          variants={spotlightVariants}
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15),transparent_70%)]"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <Suspense fallback={<div className="bg-neutral-900/50" />}>
          <ParticleBackground particleColor="#a1a1aa" particleDensity={8} />
        </Suspense>
        {/* <Suspense fallback={null}>
          <FloatingLabels floatingLabels={FLOATING_LABELS} />
        </Suspense> */}
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
        className="relative w-full max-w-7xl rounded-3xl overflow-hidden backdrop-blur-2xl border border-white/15 bg-gradient-to-br from-white/8 to-transparent shadow-2xl z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.1,
            },
          },
        }}
        id="contact-main-card"
      >
        {/* Ambient background elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Info */}
          <div className="p-8 lg:p-12 bg-gradient-to-b from-neutral-900/95 to-black/95 flex flex-col order-2 lg:order-1 min-h-[600px]">
            <motion.div
              className="flex flex-col justify-between flex-grow space-y-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="space-y-6"
              >
                <motion.span
                  className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 text-sm font-semibold border border-blue-500/30 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Collaborate with Us
                </motion.span>
                <motion.h2
                  className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 leading-tight"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Bring Your Vision to Life
                </motion.h2>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  We craft innovative digital solutions tailored to your goals.
                  Let's create something extraordinary.
                </p>
              </motion.div>

              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="space-y-5"
              >
                {features.map(({ icon: Icon, text }, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-4 group"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{
                      x: 8,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      },
                    }}
                  >
                    <motion.div
                      className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:bg-blue-500/30 transition-all duration-300"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 },
                      }}
                      initial={{ rotate: 0 }}
                    >
                      <Icon className="w-6 h-6 text-blue-300" />
                    </motion.div>
                    <span className="text-neutral-200 text-base group-hover:text-white transition-colors duration-300">
                      {text}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="space-y-6"
              >
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-purple-500/40 shadow-lg relative overflow-hidden"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-30 -z-10"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.4) 0%, transparent 70%)",
                        "radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
                        "radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.4) 0%, transparent 70%)",
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="text-white text-lg font-semibold">
                    Free Consultation
                  </p>
                  <p className="text-neutral-300 text-sm mb-4">
                    Get expert insights to kickstart your project.
                  </p>
                  <a
                    href={CALENDLY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-indigo-500/30"
                  >
                    <motion.span
                      className="flex items-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Schedule Now
                    </motion.span>
                  </a>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/80 text-neutral-200 text-sm font-medium border border-neutral-700/50 transition-all duration-300"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <PhoneIcon className="w-5 h-5" />
                    {CONTACT_PHONE}
                  </motion.a>
                  <motion.a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/80 text-neutral-200 text-sm font-medium border border-neutral-700/50 transition-all duration-300"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MailIcon className="w-5 h-5" />
                    {CONTACT_EMAIL}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div
            id="contact-form-container"
            className="p-8 lg:p-12 bg-gradient-to-b from-black/95 to-neutral-900/95 order-1 lg:order-2 relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

            {/* Progress Indicator */}
            {activeStep < 3 && (
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[1, 2].map((step) => (
                  <motion.div
                    key={step}
                    className={`h-2 rounded-full transition-all duration-700 ${
                      step === activeStep
                        ? "w-16 bg-gradient-to-r from-blue-500 to-purple-500"
                        : step < activeStep
                        ? "w-10 bg-green-500"
                        : "w-10 bg-neutral-600/50"
                    }`}
                    animate={
                      step === activeStep
                        ? {
                            scale: [1, 1.05, 1],
                            opacity: [0.7, 1, 0.7],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }
                        : {}
                    }
                  />
                ))}
                <motion.span
                  className="text-sm text-neutral-300"
                  animate={
                    activeStep < 3
                      ? {
                          opacity: [0.7, 1, 0.7],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                >
                  Step {activeStep} of 2
                </motion.span>
              </motion.div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {console.log(
                "AnimatePresence rendering with activeStep:",
                activeStep
              )}
              {/* Step 1: Service Selection */}
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    transition: { duration: 0.4 },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-center"
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Select Your Project Type
                    </h3>
                    <p className="text-neutral-300 text-base">
                      Choose a service to start your journey.
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.07 },
                      },
                    }}
                  >
                    {SERVICES.map((service) => (
                      <motion.div
                        key={service.id}
                        className={`p-6 rounded-2xl border cursor-pointer bg-gradient-to-br relative group ${
                          formData.service === service.id
                            ? `${service.gradient} border-${service.color}-500/80`
                            : "from-neutral-800/70 to-neutral-900/70 border-neutral-700/50 hover:border-neutral-500/80"
                        } backdrop-blur-md shadow-lg overflow-hidden`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            service: service.id,
                          }));
                          setFormErrors({});
                          setActiveStep(2);
                          setFormTouched(true);
                        }}
                        initial="initial"
                        whileTap="tap"
                        animate={
                          formData.service === service.id
                            ? "selected"
                            : "initial"
                        }
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                          ...serviceCardVariants,
                        }}
                        role="radio"
                        aria-checked={formData.service === service.id}
                      >
                        {/* Interactive background effect */}
                        {formData.service === service.id && (
                          <motion.div
                            className="absolute inset-0 -z-10"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              background: [
                                `radial-gradient(circle at 0% 100%, rgba(${service.colorRgb}, 0.4) 0%, transparent 50%)`,
                                `radial-gradient(circle at 100% 0%, rgba(${service.colorRgb}, 0.4) 0%, transparent 50%)`,
                                `radial-gradient(circle at 0% 100%, rgba(${service.colorRgb}, 0.4) 0%, transparent 50%)`,
                              ],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`p-3 rounded-lg bg-${service.color}-500/30 group-hover:ring-1 group-hover:ring-${service.color}-500/30 transition-all duration-300`}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                          >
                            <service.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">
                              {service.name}
                            </h4>
                            <p className="text-neutral-300 group-hover:text-neutral-200 text-sm transition-colors duration-300">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        {formData.service === service.id && (
                          <motion.div
                            className="absolute top-4 right-4"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            <CheckCircle2Icon className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <motion.button
                      onClick={() => {
                        if (formData.service) {
                          console.log(
                            "Continue button clicked with service:",
                            formData.service
                          );
                          setActiveStep(2);
                          console.log(
                            "Set active step to 2 from continue button"
                          );
                        }
                      }}
                      disabled={!formData.service}
                      className={`w-full py-4 text-lg rounded-xl font-medium text-white shadow-lg transition-all duration-300 ${
                        formData.service
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/20"
                          : "bg-neutral-700/50 cursor-not-allowed"
                      }`}
                      whileHover={
                        formData.service ? { scale: 1.02, y: -2 } : {}
                      }
                      whileTap={formData.service ? { scale: 0.98 } : {}}
                      animate={
                        formData.service
                          ? {
                              boxShadow: [
                                "0 10px 15px -3px rgba(59, 130, 246, 0.2)",
                                "0 15px 20px -3px rgba(124, 58, 237, 0.3)",
                                "0 10px 15px -3px rgba(59, 130, 246, 0.2)",
                              ],
                              transition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                            }
                          : {}
                      }
                    >
                      Continue
                      {formData.service && (
                        <ChevronRightIcon className="w-5 h-5 inline-block ml-2" />
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Form Details */}
              {activeStep === 2 &&
                // Force step 2 to be visible
                (console.log("Rendering step 2") || (
                  <motion.form
                    key="step2"
                    onSubmit={handleSubmit}
                    className="space-y-8 max-w-4xl mx-auto relative z-50 bg-neutral-900/95"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        ease: "easeOut",
                        when: "beforeChildren",
                        staggerChildren: 0.15,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: -30,
                      transition: { duration: 0.5, ease: "easeIn" },
                    }}
                    style={{
                      opacity: 1,
                      backgroundColor: "rgba(23, 23, 23, 0.95)",
                    }} /* Force visibility with background */
                  >
                    {/* Glass card container */}
                    <motion.div
                      className="relative p-8 md:p-10 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-neutral-700/50 shadow-2xl z-50"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.5, delay: 0.2 },
                      }}
                      style={{ opacity: 1 }} /* Force visibility */
                    >
                      {/* Header with animated gradient background */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        className="mb-10"
                      >
                        <motion.button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex items-center text-blue-300 hover:text-blue-200 text-sm mb-6 transition-colors duration-300 group"
                          whileHover={{ x: -4 }}
                          aria-label="Go back to Services"
                        >
                          <ChevronLeftIcon className="w-4 h-4 mr-2 group-hover:mr-3 transition-all duration-300" />
                          <span className="relative">
                            Back to Services
                            <motion.span
                              className="absolute left-0 bottom-0 w-0 h-px bg-blue-300/60 group-hover:w-full transition-all duration-300"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                            />
                          </span>
                        </motion.button>

                        <div className="relative">
                          <motion.div
                            className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.4, 0.6, 0.4],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />

                          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            Share Your Project Details
                          </h3>

                          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
                              <p className="text-neutral-200 text-sm">
                                Selected Service:{" "}
                                <span className="text-blue-300 font-medium">
                                  {
                                    SERVICES.find(
                                      (s) => s.id === formData.service
                                    )?.name
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Form Fields Grid */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                          },
                        }}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8"
                        style={{ opacity: 1 }} /* Force visibility */
                      >
                        {/* Name Field */}
                        <motion.div
                          className="relative group"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <motion.label
                            htmlFor="name"
                            className={`absolute rounded-full left-4 px-2 text-sm z-10 transition-all duration-300 ${
                              formData.name
                                ? "text-blue-400 -top-2 -translate-y-1 scale-90"
                                : "text-neutral-400 top-1/2 -translate-y-1/2"
                            }`}
                            style={{
                              background: formData.name
                                ? "#000000"
                                : "transparent",
                            }}
                          >
                            Name <span className="text-blue-400">*</span>
                          </motion.label>
                          <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className={`block w-full px-5 py-4 bg-gray-700/30 backdrop-blur-sm border-1 ${
                              formErrors.name
                                ? "border-red-500/70 focus:ring-red-500/20"
                                : "border-neutral-700/50 group-hover:border-blue-500/30 focus:border-blue-500/70"
                            } rounded-xl text-white placeholder-neutral-500 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500/10`}
                            disabled={isSubmitting}
                          />
                          <AnimatePresence>
                            {formErrors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-xs mt-2 ml-1 flex items-center"
                                role="alert"
                              >
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500/20 mr-2 animate-pulse" />
                                {formErrors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                          className="relative group"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <motion.label
                            htmlFor="email"
                            className={`absolute rounded-full left-4 px-2 text-sm z-10 transition-all duration-300 ${
                              formData.email
                                ? "text-blue-400 -top-2 -translate-y-1 scale-90"
                                : "text-neutral-400 top-1/2 -translate-y-1/2"
                            }`}
                            style={{
                              background: formData.email
                                ? "#000000"
                                : "transparent",
                            }}
                          >
                            Email <span className="text-blue-400">*</span>
                          </motion.label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className={`block w-full px-5 py-4 bg-gray-700/30 backdrop-blur-sm border-1 ${
                              formErrors.email
                                ? "border-red-500/70 focus:ring-red-500/20"
                                : "border-neutral-700/50 group-hover:border-blue-500/30 focus:border-blue-500/70"
                            } rounded-xl text-white placeholder-neutral-500 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500/10`}
                            disabled={isSubmitting}
                          />
                          <AnimatePresence>
                            {formErrors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-xs mt-2 ml-1 flex items-center"
                                role="alert"
                              >
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500/20 mr-2 animate-pulse" />
                                {formErrors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Company Field */}
                        <motion.div
                          className="relative group"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <motion.label
                            htmlFor="company"
                            className={`absolute rounded-full left-4 px-2 text-sm z-10 transition-all duration-300 ${
                              formData.company
                                ? "text-blue-400 -top-2 -translate-y-1 scale-90"
                                : "text-neutral-400 top-1/2 -translate-y-1/2"
                            }`}
                            style={{
                              background: formData.company
                                ? "#000000"
                                : "transparent",
                            }}
                          >
                            Company
                          </motion.label>
                          <input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder=" "
                            className={`block w-full px-5 py-4 bg-gray-700/30 backdrop-blur-sm border-1 ${
                              formErrors.company
                                ? "border-red-500/70 focus:ring-red-500/20"
                                : "border-neutral-700/50 group-hover:border-blue-500/30 focus:border-blue-500/70"
                            } rounded-xl text-white placeholder-neutral-500 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500/10`}
                            disabled={isSubmitting}
                          />
                          <AnimatePresence>
                            {formErrors.company && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-xs mt-2 ml-1 flex items-center"
                                role="alert"
                              >
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500/20 mr-2 animate-pulse" />
                                {formErrors.company}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Phone Field */}
                        <motion.div
                          className="relative group"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <motion.label
                            htmlFor="phone"
                            className={`absolute rounded-full left-4 px-2 text-sm z-10 transition-all duration-300 ${
                              formData.phone
                                ? "text-blue-400 -top-2 -translate-y-1 scale-90"
                                : "text-neutral-400 top-1/2 -translate-y-1/2"
                            }`}
                            style={{
                              background: formData.phone
                                ? "#000000"
                                : "transparent",
                            }}
                          >
                            Phone
                          </motion.label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder=" "
                            className={`block w-full px-5 py-4 bg-gray-700/30 backdrop-blur-sm border-1 ${
                              formErrors.phone
                                ? "border-red-500/70 focus:ring-red-500/20"
                                : "border-neutral-700/50 group-hover:border-blue-500/30 focus:border-blue-500/70"
                            } rounded-xl text-white placeholder-neutral-500 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500/10`}
                            disabled={isSubmitting}
                          />
                          <AnimatePresence>
                            {formErrors.phone && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-xs mt-2 ml-1 flex items-center"
                                role="alert"
                              >
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500/20 mr-2 animate-pulse" />
                                {formErrors.phone}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>

                      {/* Text Area */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        className="relative group mb-8"
                        style={{ opacity: 1 }} /* Force visibility */
                      >
                        <motion.label
                          htmlFor="message"
                          className={`absolute rounded-full left-4 px-2 text-sm z-10 transition-all duration-300 ${
                            formData.message
                              ? "text-blue-400 -top-2 -translate-y-1 scale-90"
                              : "text-neutral-400 top-8 -translate-y-1/2"
                          }`}
                          style={{
                            background: formData.message
                              ? "#000000"
                              : "transparent",
                          }}
                        >
                          Project Details{" "}
                          <span className="text-blue-400">*</span>
                        </motion.label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder=" "
                          rows="5"
                          required
                          className={`block w-full px-5 py-4 bg-gray-700/30 backdrop-blur-sm border-1 ${
                            formErrors.message
                              ? "border-red-500/70 focus:ring-red-500/20"
                              : "border-neutral-700/50 group-hover:border-blue-500/30 focus:border-blue-500/70"
                          } rounded-xl text-white placeholder-neutral-500 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500/10 resize-y min-h-[200px]`}
                          disabled={isSubmitting}
                        />
                        <AnimatePresence>
                          {formErrors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-xs mt-2 ml-1 flex items-center"
                              role="alert"
                            >
                              <span className="inline-block w-3 h-3 rounded-full bg-red-500/20 mr-2 animate-pulse" />
                              {formErrors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Newsletter Checkbox and Submit Button */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                        style={{ opacity: 1 }} /* Force visibility */
                      >
                        <motion.label
                          className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
                          whileHover={{
                            scale: 1.01,
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                          }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="relative flex items-center justify-center mt-0.5">
                            <input
                              type="checkbox"
                              name="subscribeNewsletter"
                              checked={formData.subscribeNewsletter}
                              onChange={handleChange}
                              className="peer sr-only"
                              disabled={isSubmitting}
                              aria-label="Subscribe to newsletter"
                            />
                            <motion.div
                              className="h-5 w-5 border-2 border-blue-500/60 rounded-md group-hover:border-blue-400 peer-checked:bg-gradient-to-br from-blue-500 to-purple-500 peer-checked:border-blue-400 shadow-md shadow-black/20 transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              animate={
                                formData.subscribeNewsletter
                                  ? {
                                      boxShadow: [
                                        "0 0 0 0 rgba(59, 130, 246, 0)",
                                        "0 0 0 4px rgba(59, 130, 246, 0.2)",
                                        "0 0 0 0 rgba(59, 130, 246, 0)",
                                      ],
                                    }
                                  : {}
                              }
                              transition={
                                formData.subscribeNewsletter
                                  ? {
                                      duration: 1.5,
                                      repeat: Infinity,
                                      repeatType: "loop",
                                    }
                                  : {}
                              }
                            />
                            <CheckIcon className="h-3 w-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                          </div>
                          <span className="text-sm text-blue-200 group-hover:text-blue-100 transition-colors">
                            Subscribe to our newsletter for exclusive updates
                            and industry insights
                          </span>
                        </motion.label>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          onClick={() => console.log("Submit button clicked")}
                          className={`w-full py-5 px-6 flex items-center justify-center gap-3 text-lg font-medium text-white rounded-xl shadow-lg relative overflow-hidden transition-all duration-300 ${
                            isSubmitting
                              ? "bg-neutral-700/50 cursor-not-allowed"
                              : "border border-white/10"
                          }`}
                          whileHover={
                            !isSubmitting ? { scale: 1.02, y: -2 } : {}
                          }
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                          {/* Animated gradient background */}
                          {!isSubmitting && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 z-0"
                              animate={{
                                backgroundPosition: [
                                  "0% 50%",
                                  "100% 50%",
                                  "0% 50%",
                                ],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              style={{ backgroundSize: "200% 200%" }}
                            />
                          )}

                          {/* Animated light effect */}
                          {!isSubmitting && (
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 skew-x-12 opacity-0"
                              animate={{
                                x: ["100%", "-100%"],
                                opacity: [0, 0.5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 5,
                              }}
                            />
                          )}

                          {isSubmitting ? (
                            <span className="flex items-center gap-3 z-10">
                              <motion.div
                                className="h-5 w-5 rounded-full border-2 border-t-white border-r-white border-b-white/20 border-l-white/20"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              <span className="text-white/90">
                                Processing...
                              </span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-3 z-10">
                              <SendIcon className="w-5 h-5" />
                              <span>Submit Your Project</span>
                            </span>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Background decorative elements */}
                    <motion.div
                      className="absolute top-20 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{ opacity: 0.3 }} /* Force visibility */
                    />

                    <motion.div
                      className="absolute bottom-20 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.2, 0.3],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                      }}
                      style={{ opacity: 0.3 }} /* Force visibility */
                    />
                  </motion.form>
                ))}

              {/* Step 3: Success */}
              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  className="flex flex-col items-center justify-center text-center py-12 lg:py-16 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.4 },
                  }}
                >
                  {/* Decorative background effect */}
                  <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
                        "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
                        "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
                      ],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center mb-8 border-2 border-green-400/50 relative overflow-hidden"
                    animate={{
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                      animate={{
                        rotate: [0, 360],
                        transition: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                    <CheckCircle2Icon className="w-14 h-14 text-green-400 relative z-10" />
                  </motion.div>

                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-3xl font-bold text-white mb-4"
                  >
                    Thank You, {formData.name.split(" ")[0] || "Visionary"}!
                  </motion.h3>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-neutral-300 text-lg mb-8 max-w-lg"
                  >
                    Your inquiry for{" "}
                    <span className="text-white font-semibold">
                      {SERVICES.find((s) => s.id === formData.service)?.name}
                    </span>{" "}
                    is on its way. We'll reach out to{" "}
                    <span className="text-white font-semibold">
                      {formData.email}
                    </span>{" "}
                    within 24 hours.
                  </motion.p>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-8 max-w-lg"
                  >
                    <p className="text-green-300 text-sm">
                      <span className="font-semibold">Success!</span> Your
                      message has been sent to our team. We appreciate your
                      interest and will get back to you as soon as possible.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="space-y-4 w-full max-w-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white text-sm font-medium transition-all duration-300"
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <PhoneIcon className="w-5 h-5" />
                        Call Us
                      </motion.a>
                      <motion.a
                        href={CALENDLY_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium transition-all duration-300"
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <CalendarIcon className="w-5 h-5" />
                        Schedule a Call
                      </motion.a>
                    </div>
                    <motion.button
                      onClick={resetForm}
                      className="w-full py-4 text-lg rounded-xl font-medium text-white bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 shadow-lg transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Another Inquiry
                    </motion.button>
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
