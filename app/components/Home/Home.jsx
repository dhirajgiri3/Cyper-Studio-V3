"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Sections/Hero/Hero";
import Story from "./Sections/Story/Story";
import Approach from "./Sections/Approach/Approach";
import Dream from "./Sections/Dream/Dream";
import ContactCard from "../Common/ContactCard/ContactCard";
import Title from "./Sections/Our-Work/Title";
import OurWork from "./Sections/Our-Work/OurWork";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.config({ force3D: true });
    let mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const sections = Array.from(
        mainRef.current.querySelectorAll("section[data-bg]")
      );
      let currentColor = sections[0].getAttribute("data-bg");

      sections.forEach((section, index) => {
        const targetColor = section.getAttribute("data-bg");

        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          end: "bottom 35%",
          toggleActions: "play none none reverse",
          onEnter: () => smoothUpdateBackground(targetColor),
          onEnterBack: () => smoothUpdateBackground(targetColor),
          onLeave: () => {
            if (index < sections.length - 1) {
              smoothUpdateBackground(
                sections[index + 1].getAttribute("data-bg")
              );
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              smoothUpdateBackground(
                sections[index - 1].getAttribute("data-bg")
              );
            }
          },
          invalidateOnRefresh: true,
          markers: false,
          scrub: 0.3,
        });
      });

      function smoothUpdateBackground(newColor) {
        gsap.to(mainRef.current, {
          backgroundColor: newColor,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
          onUpdate: () => {
            currentColor = newColor;
          },
        });
      }

      gsap.from(mainRef.current, {
        backgroundColor: "#ffffff",
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.set(mainRef.current, {
        backgroundColor: currentColor,
      });
    }, mainRef);

    return () => {
      ctx.revert();
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

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
        transition: "background-color 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <div className="fixed inset-0 z-0 backdrop-blur-[120px] transition-all duration-500 bg-gradient-to-b from-transparent to-black/5" />

      <div className="relative z-10 w-full">
        <section data-bg="#f9fafb" className="min-h-screen relative z-50">
          <Hero />
        </section>

        <section data-bg="#ffffff" className="relative z-40">
          <Story />
        </section>

        <section data-bg="#1f2126" className="min-h-screen relative z-30">
          <Approach />
        </section>

        <section data-bg="#1f2126" className="min-h-screen relative z-20">
          <Dream />
        </section>

        <section data-bg="#07070c" className="relative z-0">
          <Title />
          <OurWork />
        </section>

        <section data-bg="#07070c" className="relative z-10">
          <ContactCard />
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

export default Home;
