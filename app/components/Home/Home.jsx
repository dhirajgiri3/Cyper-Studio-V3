"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./Sections/Hero/Hero";
import Story from "./Sections/Story/Story";
import Approach from "./Sections/Approach/Approach";
import Dream from "./Sections/Dream/Dream";
import ContactCard from "../Common/ContactCard/ContactCard";
import Title from "./Sections/Our-Work/Title";
import OurWork from "./Sections/Our-Work/OurWork";
import { isReducedMotion } from "../Buttons/utils/performanceUtils";
import ContactUs from "../Common/ContactCard/ContactUs";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const reducedMotion = useMemo(() => isReducedMotion(), []);

  // Memoize the background transition duration
  const bgTransitionDuration = useMemo(
    () => (reducedMotion ? 0.3 : 0.6),
    [reducedMotion]
  );

  // Memoize the smooth update background function
  const smoothUpdateBackground = useCallback(
    (newColor, element) => {
      if (!element) return;

      gsap.to(element, {
        backgroundColor: newColor,
        duration: bgTransitionDuration,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [bgTransitionDuration]
  );

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use useGSAP for better cleanup and performance
  useGSAP(() => {
    if (!mainRef.current) return;

    gsap.config({ force3D: true });

    // Create a matchMedia context for responsive animations
    const mm = gsap.matchMedia();

    // Desktop animations
    mm.add("(min-width: 768px)", () => {
      const sections = Array.from(
        mainRef.current.querySelectorAll("section[data-bg]")
      );

      if (sections.length === 0) return;

      let currentColor = sections[0].getAttribute("data-bg");

      // Create ScrollTriggers for each section
      const scrollTriggers = sections.map((section, index) => {
        const targetColor = section.getAttribute("data-bg");

        return ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          end: "bottom 35%",
          toggleActions: "play none none reverse",
          onEnter: () => smoothUpdateBackground(targetColor, mainRef.current),
          onEnterBack: () =>
            smoothUpdateBackground(targetColor, mainRef.current),
          onLeave: () => {
            if (index < sections.length - 1) {
              smoothUpdateBackground(
                sections[index + 1].getAttribute("data-bg"),
                mainRef.current
              );
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              smoothUpdateBackground(
                sections[index - 1].getAttribute("data-bg"),
                mainRef.current
              );
            }
          },
          invalidateOnRefresh: true,
          markers: false,
          scrub: 0.3,
        });
      });

      // Initial background animation
      gsap.from(mainRef.current, {
        backgroundColor: "#ffffff",
        duration: bgTransitionDuration,
        ease: "power3.out",
      });

      gsap.set(mainRef.current, {
        backgroundColor: currentColor,
      });

      return () => scrollTriggers.forEach((st) => st.kill());
    });

    // Mobile animations - simplified for better performance
    mm.add("(max-width: 767px)", () => {
      const sections = Array.from(
        mainRef.current.querySelectorAll("section[data-bg]")
      );

      if (sections.length === 0) return;

      let currentColor = sections[0].getAttribute("data-bg");

      // Create ScrollTriggers with reduced complexity for mobile
      const scrollTriggers = sections.map((section) => {
        const targetColor = section.getAttribute("data-bg");

        return ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
          onEnter: () => smoothUpdateBackground(targetColor, mainRef.current),
          onEnterBack: () =>
            smoothUpdateBackground(targetColor, mainRef.current),
          invalidateOnRefresh: true,
          markers: false,
          scrub: 0.2, // Faster scrub for mobile
        });
      });

      // Initial background animation
      gsap.from(mainRef.current, {
        backgroundColor: "#ffffff",
        duration: bgTransitionDuration,
        ease: "power3.out",
      });

      gsap.set(mainRef.current, {
        backgroundColor: currentColor,
      });

      return () => scrollTriggers.forEach((st) => st.kill());
    });

    return () => mm.revert();
  }, [smoothUpdateBackground, bgTransitionDuration]);

  return (
    <main
      ref={mainRef}
      className="min-h-screen w-full relative overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: "#f9fafb",
        transform: "translate3d(0,0,0)",
        perspective: "1000px",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "background-color",
        transition: `background-color ${bgTransitionDuration}s cubic-bezier(0.33, 1, 0.68, 1)`,
      }}
    >
      <div className="fixed inset-0 z-0 backdrop-blur-[120px] transition-all duration-500 bg-gradient-to-b from-transparent to-black/5" />

      <div className="relative z-10 w-full">
        <section id="hero" data-bg="#f9fafb" className="min-h-screen relative z-50">
          <Hero />
        </section>

        <section id="story" data-bg="#ffffff" className="relative z-40">
          <Story />
        </section>

        <section id="approach" data-bg="#1f2126" className="min-h-screen relative z-30">
          <Approach />
        </section>

        <section id="dream" data-bg="#1f2126" className="min-h-screen relative z-20">
          <Dream />
        </section>

        <section id="our-work" data-bg="#000000" className="relative z-10">
          <Title />
          <OurWork />
        </section>

        {/* <section data-bg="#000000" className="relative z-10">
          <ContactCard />
        </section> */}

        <section id="contact" data-bg="#000000" className="relative z-10">
          <ContactUs />
        </section>
      </div>
      <div
        className="fixed inset-0 z-[60] pointer-events-none mix-blend-overlay opacity-20 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at center, transparent, rgba(0,0,0,0.15))",
          backdropFilter: "blur(30px)",
        }}
      />
    </main>
  );
}

// Use React.memo to prevent unnecessary re-renders
export default memo(Home);
