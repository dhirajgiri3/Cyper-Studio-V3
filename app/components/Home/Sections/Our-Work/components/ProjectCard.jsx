// /ProjectCard.jsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectItem from "./ProjectItem";
import { generateGridLayout } from "./utils/layoutUtils";
import { TRANSITION_VARIANTS } from "./utils/animationUtils";
import { CATEGORIES } from "./constants/cardConstants";

const ProjectCard = forwardRef(({ projectsData, initialCategory = "live", projectsToShow = 8, onLoadMore }, ref) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [layout, setLayout] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [projectLimit, setProjectLimit] = useState(projectsToShow);
  const isClient = useRef(false);
  const initialMountRef = useRef(true);

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

  // Update category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Update the filtered projects when category changes or project limit changes
  useEffect(() => {
    if (!projectsData) return;

    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    if (!category) return;

    const projects = projectsData[category.type] || [];
    const limitedProjects = projects.slice(0, projectLimit);

    // Minimal animation on first render for better performance
    if (initialMountRef.current) {
      setFilteredProjects(limitedProjects);
      setLayout(generateGridLayout(limitedProjects.length));
      initialMountRef.current = false;
    } else {
      // Use GSAP or other animation lib for smoother transitions
      setTimeout(() => {
        setFilteredProjects(limitedProjects);
        setLayout(generateGridLayout(limitedProjects.length));
      }, 100); // Small timeout for visual transition
    }

    // Dispatch event for Title component communication
    if (typeof window !== 'undefined' && !initialMountRef.current) {
      const event = new CustomEvent('category-updated', {
        detail: { category: selectedCategory }
      });
      window.dispatchEvent(event);
    }
  }, [selectedCategory, projectsData, projectLimit]);

  // Function to handle loading more projects
  const handleLoadMore = () => {
    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    if (!category) return;

    const projects = projectsData[category.type] || [];
    const newLimit = Math.min(projectLimit + 4, projects.length);

    setProjectLimit(newLimit);

    // Call the parent component's onLoadMore if provided
    if (onLoadMore) {
      onLoadMore(newLimit, projects.length, selectedCategory);
    }
  };

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    handleLoadMore,
    hasMoreProjects: hasMoreProjects(),
    currentCategory: selectedCategory,
    totalInCategory: (() => {
      const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
      return category ? (projectsData[category.type] || []).length : 0;
    })(),
    visibleCount: filteredProjects.length
  }));

  // Check if there are more projects to load
  const hasMoreProjects = () => {
    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    if (!category) return false;

    const projects = projectsData[category.type] || [];
    return projectLimit < projects.length;
  };

  return (
    <div className="relative w-full mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center mb-10 sm:mb-14 lg:mb-20 z-5">
        <div className="relative flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-full bg-gradient-to-br from-black/80 via-black/70 to-[#07070c]/80 backdrop-blur-xl border border-white/10 shadow-xl w-[90vw] sm:w-[70vw] lg:w-[50vw] xl:w-[40vw] hardware-accelerated">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;
            const projectCount = projectsData?.[category.type]?.length || 0;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-500 ease-out flex-1 sm:flex-none justify-center min-w-[120px] ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-700/70 to-purple-700/70"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
                  />
                )}
                <span className="relative">{category.label}</span>
                <span
                  className={`relative px-2 py-0.5 text-xs rounded-full transition-colors duration-300 ${
                    isActive ? "bg-blue-500/90 text-white" : "bg-blue-900/50 text-white/80"
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
          className="relative z-5"
          variants={TRANSITION_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className={`relative grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)] sm:auto-rows-[minmax(360px,auto)] lg:auto-rows-[minmax(50vh,auto)]`}
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
            className="relative text-center py-16 sm:py-20 bg-gradient-to-br from-black/40 to-black/20 border border-white/10 rounded-3xl backdrop-blur-3xl"
          >
            <h3 className="text-xl sm:text-2xl font-medium text-white/90">No projects found in this category</h3>
            <p className="text-sm sm:text-base text-white/65 mt-3">Check back soon for new additions!</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
});

export default ProjectCard;