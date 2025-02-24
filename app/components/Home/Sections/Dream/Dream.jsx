import React, { memo, useLayoutEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Up from "./Up";
import Scene from "../../../3D/Scene";
import Item11 from "../../../3D/Models/Item11";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";

gsap.registerPlugin(ScrollTrigger);

const fadeVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
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
      className="w-full max-w-xl mx-auto md:mx-0 space-y-6 md:space-y-8 px-0 sm:px-4 md:px-8 relative group"
    >
      {/* Decorative gradients */}
      <div className="hidden md:block absolute -left-4 top-0 w-1.5 h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      <div className="hidden md:block absolute -left-8 top-0 w-2 h-48 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent blur-md" />

      <motion.div className="relative space-y-2">
        <span className="inline-flex items-center text-primary text-sm tracking-wider uppercase font-medium">
          Our Vision
        </span>
      </motion.div>

      <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        <motion.span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
          Bringing Your Vision to Life
        </motion.span>
      </motion.h2>

      <AnimatedText
        text="Cyper Studio, an emerging agency, embodies dynamism and creativity, driven by a dedicated team eager to bring your vision to life. We are your partners in progress, committed to exceeding expectations and pushing boundaries in the digital landscape."
        className="text-base text-[#bbbbbb] font-normal leading-relaxed"
      />

      <div className="pt-4">
        <PrimaryButton
          withParticles={true}
          withRipple={true}
          className="w-full sm:w-auto"
        >
          <span className="relative font-medium">Learn more</span>
        </PrimaryButton>
      </div>
    </motion.div>
  );
});

const VisionSection = memo(() => (
  <div className="flex flex-col items-center gap-12 md:gap-20 text-center px-4 sm:px-6 md:px-8 relative">
    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
    <motion.div
      variants={fadeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="max-w-4xl mx-auto relative"
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <p className="text-sm text-primary tracking-widest uppercase mb-4 md:mb-6 font-medium">
        For Dreamers and Doers
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
        We don't just sling code—we sculpt your future. Every pixel, every line
        is a brushstroke on your digital masterpiece.
      </h1>
    </motion.div>

    <motion.div
      variants={fadeVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto space-y-4 md:space-y-6 relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
    >
      <p className="text-lg sm:text-xl font-semibold text-white/90">
        Ready to see your vision come alive?
      </p>
      <p className="text-sm sm:text-base text-white/70 leading-relaxed">
        Team up with us, and your goals become our obsession. We'll hustle
        behind the scenes to fuse tech and creativity into solutions that don't
        just meet expectations—they moonwalk past them.
      </p>
    </motion.div>
  </div>
));

const Dream = () => {
  return (
    <section className="relative w-full py-0 md:py-24 md:pb-12 overflow-hidden bg-dark">
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

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
            <TextContent />
            <motion.div
              variants={fadeVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative w-full h-[45vh] md:h-full max-w-xl mx-auto flex justify-center items-center rounded-2xl overflow-hidden group"
            >
              <Scene children={<Item11 />} />
            </motion.div>
          </div>

          <div className="relative">
            <VisionSection />
            <div className="mt-20 md:mt-28">
              <Up />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Dream);
