import React, { memo, useLayoutEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";
import Up from "./Up";
import Scene from "../../../3D/Hero/Scene";
import Item11 from "../../../3D/Hero/Item11";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryButton from "../../../Buttons/PrimaryButton";

gsap.registerPlugin(ScrollTrigger);

const fadeVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut", // Changed from cubic-bezier to a valid easing
    },
  },
};

const AnimatedText = memo(({ text, className }) => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const elements = [];
    const words = text.split(" ");

    textRef.current.innerHTML = "";

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";

      const chars = word.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        span.style.filter = "blur(10px)";
        span.style.display = "inline-block";
        wordSpan.appendChild(span);
      });

      elements.push(...wordSpan.children);
      textRef.current.appendChild(wordSpan);

      if (wordIndex !== words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        textRef.current.appendChild(space);
      }
    });

    gsap.to(elements, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.5,
      stagger: 0.02,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
    });
  }, [text]);

  return <p ref={textRef} className={className} />;
});

const TextContent = memo(() => {
  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-xl order-2 md:order-1 space-y-8 px-6 md:px-8 relative group"
    >
      {/* Decorative gradients with enhanced visibility */}
      <div className="absolute -left-4 top-0 w-1.5 h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      <div className="absolute -left-8 top-0 w-2 h-48 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent blur-md" />

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative"
      >
        <span className="inline-flex items-center text-primary text-sm tracking-wider uppercase font-medium">
          <span className="absolute -left-4 top-1/2 -translate-y-1/2"></span>
          Our Vision
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 duration-500"
          transition={{ type: "spring", stiffness: 300 }}
        >
          Bringing Your Vision to Life
        </motion.span>
      </motion.h2>

      <AnimatedText
        text="Cyper Studio, an emerging agency, embodies dynamism and creativity, driven by a dedicated team eager to bring your vision to life. We are your partners in progress, committed to exceeding expectations and pushing boundaries in the digital landscape."
        className="text-lg text-[#bbbbbb] leading-relaxed"
      />

      <PrimaryButton
        withParticles={true}
        withRipple={true}
        className="w-full flex flex-row"
      >
        <span className="relative font-medium">Learn more</span>
      </PrimaryButton>
    </motion.div>
  );
});

const VisionSection = memo(() => (
  <div className="flex flex-col items-center gap-20 text-center p-4 md:p-8 relative">
    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
    <motion.div
      variants={fadeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="max-w-4xl relative"
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <p className="text-sm text-primary tracking-widest uppercase mb-6 font-medium">
        For Dreamers and Doers
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
        We don't just sling code—we sculpt your future. Every pixel, every line
        is a brushstroke on your digital masterpiece.
      </h1>
    </motion.div>

    <motion.div
      variants={fadeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="max-w-2xl space-y-6 relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
    >
      <p className="text-xl font-semibold text-white/90">
        Ready to see your vision come alive?
      </p>
      <p className="text-base text-white/70 leading-relaxed">
        Team up with us, and your goals become our obsession. We'll hustle
        behind the scenes to fuse tech and creativity into solutions that don't
        just meet expectations—they moonwalk past them.
      </p>
    </motion.div>
  </div>
));

const ParticlesComponent = memo(() => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 100,
        density: { enable: true, value_area: 800 },
      },
      color: {
        value: ["#FF69B4", "#4169E1", "#7B68EE", "#00CED1"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        resize: true,
      },
    },
    background: {
      color: "transparent",
    },
    detectRetina: true,
    fullScreen: {
      enable: false, // This is crucial - prevents particles from going fullscreen
    },
  };

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
});

const Dream = () => {
  return (
    <section className="relative w-full min-h-screen py-20 md:py-32 overflow-hidden bg-dark">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808] to-black"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <ParticlesComponent />

      <div className="relative z-10">
        {" "}
        {/* Wrap content to ensure it's above particles */}
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <TextContent />
            <motion.div
              variants={fadeVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="3d-obj relative w-full h-[60vh] flex justify-center items-center rounded-2xl overflow-hidden group"
            >
              <Scene children={<Item11 />} />
            </motion.div>
          </div>

          <div className="relative">
            <ParticlesComponent />
            <VisionSection />
            <Up />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Dream);
