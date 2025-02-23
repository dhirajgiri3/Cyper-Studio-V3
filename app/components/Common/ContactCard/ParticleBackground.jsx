// src/components/ParticleBackground.jsx
import React, { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = memo(() => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 30, density: { enable: true, area: 1500 } },
        color: { value: ["#60A5FA", "#A855F7"] },
        links: {
          enable: true,
          opacity: 0.03,
          width: 0.5,
          distance: 150,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          outModes: "out",
        },
        size: {
          value: { min: 1, max: 2 },
        },
        opacity: {
          value: { min: 0.05, max: 0.2 },
        },
      },
    }),
    []
  );

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="h-full"
      />
    </motion.div>
  );
});

ParticleBackground.displayName = "ParticleBackground";

export default ParticleBackground;