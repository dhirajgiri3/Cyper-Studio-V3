// /ProjectCard.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectItem from "./ProjectItem";
import { generateGridLayout } from "./utils/layoutUtils";
import { TRANSITION_VARIANTS } from "./utils/animationUtils";
import { CATEGORIES } from "./constants/cardConstants";

const ProjectCard = ({ projectsData }) => {
  const [selectedCategory, setSelectedCategory] = useState("live");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [layout, setLayout] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const isClient = useRef(false);

  // Set isClient to true on mount and handle window resize
  useEffect(() => {
    isClient.current = true;
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!projectsData) return;

    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    if (!category) return;

    const projects = projectsData[category.type] || [];
    const limitedProjects = projects.slice(0, 8);
    setFilteredProjects(limitedProjects);
    setLayout(generateGridLayout(limitedProjects.length));
  }, [selectedCategory, projectsData]);

  return (
    <div className="relative w-full mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center mb-10 sm:mb-14 lg:mb-20 z-10">
        <div className="relative flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-full bg-gradient-to-br from-neutral-700/40 via-neutral-800/30 to-neutral-900/40 backdrop-blur-xl border border-white/15 shadow-lg w-[90vw] sm:w-[70vw] lg:w-[50vw] xl:w-[40vw]">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;
            const projectCount = projectsData?.[category.type]?.length || 0;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-500 ease-out flex-1 sm:flex-none justify-center min-w-[120px] ${
                  isActive ? "text-black/90" : "text-white/90 hover:text-white"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.activeColor}`}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
                  />
                )}
                <span className="relative">{category.label}</span>
                <span
                  className={`relative px-2 py-0.5 text-xs rounded-full transition-colors duration-300 ${
                    isActive ? "bg-black/90 text-white" : "bg-black/70 text-white/90"
                  }`}
                >
                  {projectCount}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedCategory}
          className="relative z-10"
          variants={TRANSITION_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className={`relative grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)] sm:auto-rows-[minmax(360px,auto)] lg:auto-rows-[minmax(50vh,auto)] perspective-[2000px] transform-gpu`}
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`relative transform-gpu ${index === 0 ? "xs:col-span-2 lg:col-span-8" : ""} ${index === 1 ? "lg:col-span-4" : ""} ${
                  !isClient.current || windowWidth < 1024 ? "" : layout[index]?.variant === "wide" ? "lg:col-span-6" : ""
                }`}
                style={
                  isClient.current && windowWidth >= 1024
                    ? {
                        gridColumn: `${layout[index]?.colStart || 1} / span ${layout[index]?.colSpan || 4}`,
                        gridRow: `span ${layout[index]?.rowSpan || 1}`,
                      }
                    : {}
                }
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: index * 0.12, ease: [0.25, 0.4, 0.25, 1] },
                }}
                exit={{ opacity: 0, y: 30 }}
              >
                <ProjectItem
                  project={project}
                  index={index}
                  variant={isClient.current && windowWidth >= 1024 ? layout[index]?.variant || "normal" : "mobile"}
                  totalProjects={filteredProjects.length}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative text-center py-16 sm:py-20 bg-gradient-to-br from-white/[0.1] to-white/[0.03] border border-white/15 rounded-3xl backdrop-blur-3xl"
          >
            <h3 className="text-xl sm:text-2xl font-medium text-white/90">No projects found in this category</h3>
            <p className="text-sm sm:text-base text-white/65 mt-3">Check back soon for new additions!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;