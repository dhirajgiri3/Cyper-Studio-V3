import React, { useRef } from "react";
import { motion } from "framer-motion";
import { projectsData } from "./Data/ProjectCardsData";
import ProjectCard from "./components/ProjectCard";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";

function OurWork() {
  const sectionRef = useRef(null);

  // Calculate total projects across all categories
  const totalProjects = Object.values(projectsData).reduce(
    (acc, curr) => acc + (curr?.length || 0),
    0
  );

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    fullScreen: false,
    particles: {
      color: {
        value: [
          "#60A5FA",
          "#A855F7",
          "#34D399",
          "#F472B6",
          "#FBBF24",
          "#F0F8FF",
        ],
        animation: {
          enable: true,
          speed: 20,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out",
      },
      number: { density: { enable: true, area: 1000 }, value: 40 },
      opacity: {
        value: 0.3,
        animation: { enable: true, speed: 0.5, minimumValue: 0.1 },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false },
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] py-8 sm:py-10 md:py-12 lg:py-16 
                 bg-[#07070c] overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Base gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070c] via-[#07070c]/95 to-black/90" />

        {/* Enhanced radial gradients */}
        <div
          className="absolute top-0 left-0 w-full h-full 
          bg-[radial-gradient(ellipse_at_top,rgba(14,78,232,0.15),transparent_70%)]
          blur-3xl opacity-60"
        />

        <div
          className="absolute bottom-0 right-0 w-full h-full 
          bg-[radial-gradient(ellipse_at_bottom,rgba(142,53,240,0.15),transparent_70%)]
          blur-3xl opacity-60"
        />

        {/* Enhanced floating blobs */}
        <div
          className="absolute top-1/4 left-1/3 w-[45rem] h-[45rem] 
          bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_50%)]
          animate-blob-slow filter blur-2xl"
        />

        <div
          className="absolute bottom-1/4 right-1/3 w-[40rem] h-[40rem] 
          bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_50%)]
          animate-blob-slow-reverse filter blur-2xl"
        />

        {/* New accent gradients */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-noise-pattern mix-blend-overlay opacity-[0.02]" />

        {/* Particle system */}
        <Particles
          id="tsparticles-ourwork"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0"
        />

        {/* Enhanced mesh pattern */}
        <div className="absolute inset-0 bg-mesh-pattern opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-0 xs:px-5 sm:px-6 lg:px-8 relative z-10 max-w-[2000px]">
        {/* Projects Grid with Filtering */}
        <div className="relative mt-12 xs:mt-16 sm:mt-20">
          <ProjectCard projectsData={projectsData} />
        </div>

        {/* View All Button - Enhanced Responsive Margins */}
        {totalProjects > 8 && (
          <motion.div
            className="text-center mt-16 xs:mt-20 sm:mt-24 md:mt-28 lg:mt-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 0.9] },
            }}
            viewport={{ once: true }}
          >
            <PrimaryButton
              variant="primary"
              size="large"
              withParticles={true}
              className="hardware-accelerated rounded-full 
                        text-sm xs:text-base sm:text-lg
                        px-6 py-3 xs:px-8 xs:py-4 sm:px-10"
            >
              View All Projects
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default OurWork;
