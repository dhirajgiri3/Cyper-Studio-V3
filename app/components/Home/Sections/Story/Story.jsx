import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryButton from "../../../Buttons/PrimaryButton";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedText({ text, innerRef }) {
  return (
    <span ref={innerRef} className="inline-block">
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="opacity-0 inline-block filter blur-sm"
            >
              {char}
            </span>
          ))}
          <span className="opacity-0 inline-block filter blur-sm">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

function Story() {
  const videoRef = useRef(null);
  const animatedTextRef1 = useRef(null);
  const animatedTextRef2 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5, ease: "power2.out" });
    if (animatedTextRef1.current) {
      tl.to(animatedTextRef1.current.querySelectorAll("span"), {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.25,
        stagger: 0.04,
      });
    }
    if (animatedTextRef2.current) {
      tl.to(
        animatedTextRef2.current.querySelectorAll("span"),
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.25,
          stagger: 0.04,
        },
        "+=0.3"
      );
    }
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 w-full px-6 sm:px-10 md:px-20 lg:px-32 py-16 pt-8 relative">
        {/* Story Left */}
        <div className="flex flex-col items-center justify-center gap-8 flex-1 text-center md:text-left">
          <motion.h1 
            className="text-2xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-dark to-black/90 bg-clip-text text-transparent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            Our Story
          </motion.h1>
          <motion.div 
            className="relative w-40 h-40 sm:w-[14rem] sm:h-[14rem] md:w-[18rem] md:h-[18rem] lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              className="w-40 h-40 sm:w-[14rem] sm:h-[14rem] md:w-[18rem] md:h-[18rem] lg:w-[22rem] lg:h-[22rem] object-cover rounded-full transition-transform duration-500 hover:scale-105"
              loop
              autoPlay
              muted
              playsInline
              src="https://firebasestorage.googleapis.com/v0/b/cyper-studio.appspot.com/o/Cyper-3d.mp4?alt=media&token=4115996f-f023-4560-8dc9-20d1437327d9"
            />
          </motion.div>
        </div>

        {/* Story Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-col gap-6 flex-1 md:pl-12 text-center md:text-left"
        >
          {/* Keep existing AnimatedText components unchanged */}
          <p className="text-nm sm:text-base md:text-base font-light text-gray-700 leading-relaxed">
            <AnimatedText
              text="Cyper Studio was born out of a passion for technology and a desire to make a difference. Founded by a team of visionary entrepreneurs, we set out to create digital solutions that not only solve problems but also inspire and empower."
              innerRef={animatedTextRef1}
            />
          </p>
          <p className="text-nm sm:text-base md:text-base font-light text-gray-700 leading-relaxed">
            <AnimatedText
              text="From our humble beginnings, we've grown to become a trusted partner for businesses around the world, delivering innovative products that drive success."
              innerRef={animatedTextRef2}
            />
          </p>
          <motion.div
            variants={revealVariants}
          >
            <PrimaryButton
              variant="primary"
              size="large"
              withParticles={true}
              withRipple={true}
            >
              Learn More
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Story;
