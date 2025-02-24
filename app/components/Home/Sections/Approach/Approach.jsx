import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";

gsap.registerPlugin(ScrollTrigger);

const ApproachAnimatedText = ({ text, className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const elements = [];
    const words = text.split(" ");
    
    if (!textRef.current) return;
    
    textRef.current.innerHTML = "";
    
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.overflow = "hidden";
      wordSpan.style.position = "relative";
      
      const chars = word.split("");
      chars.forEach((char, charIndex) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.transform = "translate3d(-20px, 105%, 0) rotateX(-20deg)";
        charSpan.style.opacity = "0";
        charSpan.style.filter = "blur(12px)";
        charSpan.style.transformOrigin = "bottom";
        charSpan.style.transformStyle = "preserve-3d";
        charSpan.style.willChange = "transform, opacity, filter";
        wordSpan.appendChild(charSpan);
      });
      
      elements.push(...wordSpan.children);
      textRef.current.appendChild(wordSpan);
      
      if (i !== words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        textRef.current.appendChild(space);
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    // Calculate exponential stagger timing
    const staggerConfig = {
      each: 0.03,
      from: "start",
      ease: "power4.in", // Use power4.in for exponential acceleration
      onStart: function() {
        gsap.to(this.targets(), {
          duration: 0.8,
          stagger: {
            each: 0.01,
            from: "start",
            ease: "power4.in",
          },
        });
      },
    };

    tl.to(elements, {
      x: 0,
      y: 0,
      rotateX: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: function(i) {
        // Duration decreases exponentially for each character
        return 1.5 * Math.pow(0.95, i);
      },
      stagger: staggerConfig,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [text]);

  return (
    <p 
      ref={textRef} 
      className={`${className} [perspective:1000px]`}
      style={{ 
        willChange: "transform",
        transformStyle: "preserve-3d"
      }}
    />
  );
};

function Approach() {
  const approachSectionRefs = useRef([]);
  const contentRefs = useRef([]);
  const videoRefs = useRef([]);

  approachSectionRefs.current = [];
  contentRefs.current = [];
  videoRefs.current = [];

  useEffect(() => {
    approachSectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        videoRefs.current[index],
        { opacity: 0, y: "3rem" },
        {
          opacity: 1,
          y: "0rem",
          duration: 1.2,
          delay: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        contentRefs.current[index].children,
        { opacity: 0, y: "3rem" },
        {
          opacity: 1,
          y: "0rem",
          stagger: 0.3,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el, ref) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-16 md:py-10 md:pb-0 bg-dark rounded-t-3xl shadow-none">
      <div className="space-y-28">
        {/* Section One */}
        <div
          className="flex flex-col md:flex-row items-center gap-16"
          ref={(el) => addToRefs(el, approachSectionRefs)}
        >
          <div
            className="flex-1 group"
            ref={(el) => addToRefs(el, videoRefs)}
          >
            <div className="relative p-3 rounded-3xl border border-[#333] shadow-md transition-all duration-500 hover:border-[#444]">
              <video
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                src="https://firebasestorage.googleapis.com/v0/b/cyper-studio.appspot.com/o/4.mp4?alt=media&token=14666be1-1d7f-49d9-aac8-ab36264b5499"
                loop
                autoPlay
                playsInline
                muted
              />
            </div>
          </div>
          <div
            className="flex-1 flex flex-col items-start gap-8"
            ref={(el) => addToRefs(el, contentRefs)}
          >
            <span className="text-[#666] text-sm tracking-wider font-medium">01 / VISION</span>
            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl text-white font-semibold leading-tight">
                We Envision
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-md text-[#999] font-light leading-relaxed">
              Got a crazy idea? We'll cannonball into it, crafting digital experiences that'll make jaws drop. Take Helix—we flipped their logistics game with real-time tracking and courier wizardry so slick, it's practically sorcery.
            </p>
            <PrimaryButton
              variant="primary"
              size="large"
              withParticles={true}
              className="mt-4 text-white shadow-lg transition-all duration-300"
            >
              Explore Our Work
            </PrimaryButton>
          </div>
        </div>

        {/* Section Two */}
        <div
          className="flex flex-col md:flex-row-reverse items-center gap-16"
          ref={(el) => addToRefs(el, approachSectionRefs)}
        >
          <div
            className="flex-1 group"
            ref={(el) => addToRefs(el, videoRefs)}
          >
            <div className="relative p-3 rounded-3xl border border-[#333] shadow-md transition-all duration-500 hover:border-[#444]">
              <video
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                src="https://firebasestorage.googleapis.com/v0/b/cyper-studio.appspot.com/o/5.mp4?alt=media&token=d5221841-4383-4542-9db3-3b1f669129de"
                loop
                autoPlay
                playsInline
                muted
              />
            </div>
          </div>
          <div
            className="flex-1 flex flex-col items-start gap-8"
            ref={(el) => addToRefs(el, contentRefs)}
          >
            <span className="text-[#666] text-sm tracking-wider font-medium">02 / BUILD</span>
            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl text-white font-semibold leading-tight">
                We Build Brilliance
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-md text-[#999] font-light leading-relaxed">
              We’re tech chefs whipping up scalable solutions with a dash of
              creative flair. You bring the idea; we toss in the secret sauce (and
              maybe some digital glitter). The result? Apps and systems so tasty,
              they’d earn a Michelin star in the tech world.
            </p>
            <PrimaryButton
              variant="primary"
              size="large"
              withParticles={true}
              className="mt-4 text-white shadow-lg transition-all duration-300"
            >
              Learn Our Process
            </PrimaryButton>
          </div>
        </div>

        {/* Section Three */}
        <div
          className="flex flex-col md:flex-row items-center gap-16"
          ref={(el) => addToRefs(el, approachSectionRefs)}
        >
          <div
            className="flex-1 group"
            ref={(el) => addToRefs(el, videoRefs)}
          >
            <div className="relative p-3 rounded-3xl border border-[#333] shadow-md transition-all duration-500 hover:border-[#444]">
              <video
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                src="https://firebasestorage.googleapis.com/v0/b/cyper-studio.appspot.com/o/6.mp4?alt=media&token=0b627515-826e-46fc-ade3-cc386eafcd0d"
                loop
                autoPlay
                playsInline
                muted
              />
            </div>
          </div>
          <div
            className="flex-1 flex flex-col items-start gap-8"
            ref={(el) => addToRefs(el, contentRefs)}
          >
            <span className="text-[#666] text-sm tracking-wider font-medium">03 / EMPOWER</span>
            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl text-white font-semibold leading-tight">
                We Empower (and High-Five)
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-md text-[#999] font-light leading-relaxed">
              Collaboration is our jam. We keep you looped in—no “where’s my
              project?” panic here. Your success is our scoreboard, tied only with
              our weekly coffee tally. Let’s build something epic together!
            </p>
            <PrimaryButton
              variant="primary"
              size="large"
              withParticles={true}
              className="mt-4 text-white shadow-lg transition-all duration-300"
            >
              Let's Create Magic
            </PrimaryButton>
          </div>
        </div>

        {/* Updated Footer Text */}
        <div 
          className="max-w-3xl mx-auto text-center pt-12 mt-0 border-t border-[#333] overflow-hidden"
          ref={(el) => addToRefs(el, contentRefs)}
        >
          <ApproachAnimatedText
            text="At Cyper Studio, we scale smart. We reimagine your brand and product to keep you connected with a growing audience, taking your vision from concept to launch through tailored design sprints that transform ideas into a winning Product."
            className="text-md text-[#999] font-light leading-relaxed text-left md:text-center"
          />
        </div>
      </div>
    </section>
  );
}

export default Approach;
