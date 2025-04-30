import React from "react";
import Link from "next/link";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import { motion } from "framer-motion";
import ImageTrail from "../../../Animations/ImageTrail/ImageTrail";
import Item9 from "../../../3D/Models/Item9";
import Scene from "../../../3D/Scene";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.section
      className="min-h-[90vh] w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-20 py-16 pt-28 md:pt-32 md:pb-10 grid gap-16 relative overflow-hidden hardware-accelerated [&>hr]:mx-12 [&>hr]:w-4/5 [&>hr]:border-0 [&>hr]:h-[1px] [&>hr]:bg-gradient-to-r [&>hr]:from-transparent [&>hr]:via-black/30 [&>hr]:to-transparent [&_h1_span]:relative [&_h1_span:after]:content-[''] [&_h1_span:after]:absolute [&_h1_span:after]:w-0 [&_h1_span:after]:h-[2px] [&_h1_span:after]:bottom-0 [&_h1_span:after]:left-0 [&_h1_span:after]:bg-[var(--accent-gradient)] [&_h1_span:after]:transition-[width] [&_h1_span:after]:duration-300 [&_h1_span:after]:ease-in-out hover:[&_h1_span:after]:w-full z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="background-trail absolute inset-0 -z-10">
        <ImageTrail />
      </div>
      <div className="hero-top w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="texts flex flex-col gap-6 md:gap-8"
          variants={itemVariants}
        >
          <h1 className="text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] leading-[1.2] font-semibold font-clash text-black tracking-tight pb-8">
            Where{" "}
            <motion.span className="font-playfair font-medium italic text-neutral-800 inline-block">
              Innovation
            </motion.span>{" "}
            <br />
            Meets{" "}
            <motion.span className="font-playfair font-medium italic text-neutral-800 inline-block">
              Passion
            </motion.span>
          </h1>
          <motion.p
            className="text-[.9rem] leading-relaxed text-text-secondary"
            variants={itemVariants}
          >
            <span>
              Bringing Premium Solutions to Everyone—Because Your Success is Our
              Success.
            </span>
            <br />
            <br />
            <span>
              <strong className="text-dark">Welcome to Cyper Studio!</strong>{" "}
              We're not just tech wizards—we're your partners in innovation.
              Whether you're a startup with big dreams or an established
              business ready to scale, we're here to help you succeed without
              breaking the bank. Ready to kick off your journey? Let's make
              magic happen—no stress, just results.
            </span>
          </motion.p>
        </motion.div>

        <div className="threed h-[40vh] md:h-[500px] flex justify-center items-center relative perspective-1000">
          <div className="w-full h-full">
            <Scene children={<Item9 />} />
          </div>
        </div>
      </div>

      <motion.div
        className="hero-bottom flex flex-col items-center gap-8 text-center"
        variants={itemVariants}
      >
        <motion.p variants={itemVariants}>
          We love to bring smiles to people's faces, and that's our job—yep,
          we're serious! 😉
        </motion.p>
        <motion.div className="flex gap-4" variants={itemVariants}>
          <Link
            href="/#contact"
            className="relative font-medium"
          >
            <PrimaryButton
              variant="primary"
              size="large"
              withParticles={true}
              withRipple={true}
            >
              {" "}
              Start Your Project
            </PrimaryButton>
          </Link>
        </motion.div>
      </motion.div>
      <hr className="block" />
    </motion.section>
  );
}

export default React.memo(Hero);
