"use client";

import { Item12 } from "../../3D/Models/Item12";
import Scene from "../../3D/Scene";
import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[700px] bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent opacity-60 animate-aurora mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.4),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-mesh-pattern opacity-5 animate-float-slow" />
        <div className="bg-3dobject w-full h-full scale-110 md:scale-125 transform-gpu opacity-100 animate-float">
          <Scene>
            <Item12 />
          </Scene>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* CTA Section */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-32 space-y-6 sm:space-y-8">
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-3xl opacity-80 group-hover:opacity-100 transition-all duration-700 -z-10" />
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/90 leading-tight tracking-tight px-2">
                Let's Create Something
                <br className="hidden sm:block" />
                Extraordinary
              </h2>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed px-2">
              Transforming visionary ideas into extraordinary digital
              experiences. <br /> Feel free to reach out if you want to collaborate, or
              simply have a chat :)
            </p>
            <div className="relative inline-block group perspective-1000">
              <Link
                href="/#contact"
                className="relative font-medium"
              >
              <PrimaryButton
                variant="primary"
                size="large"
                withParticles={true}
                withRipple={true}
                className="relative !px-6 xs:!px-8 sm:!px-14 !py-3 xs:!py-4 sm:!py-6 text-sm xs:text-base sm:text-lg tracking-wide backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
              >
                <span className="relative flex items-center gap-2 sm:gap-3 font-medium">
                  Start Your Project
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="relative">
            <div className="relative px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-10 sm:py-12 lg:py-16 backdrop-blur-3xl backdrop-brightness-125 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 hover:border-white/20 transition-colors duration-300">
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Navigation */}
                <div className="xs:col-span-2 lg:col-span-5 space-y-4 sm:space-y-6">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Ready to transform your vision?
                  </h3>
                  <p className="text-white/60 leading-relaxed max-w-md text-xs xs:text-sm sm:text-base">
                    Join forward-thinking brands building the future with our
                    innovative solutions
                  </p>
                </div>

                {/* Quick Links */}
                <div className="xs:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
                  <h4 className="text-white/90 font-medium tracking-wide text-xs xs:text-sm sm:text-base">
                    Explore
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      { name: "Our Work", path: "/#our-work" },
                      { name: "Services", path: "/#our-work" },
                      { name: "About Us", path: "/#story" },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          className="text-white/60 hover:text-white transition-all duration-300 text-sm xs:text-sm inline-flex items-center group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {item.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact & Social */}
                <div className="xs:col-span-1 lg:col-span-4 space-y-4 sm:space-y-6">
                  <h4 className="text-white/90 font-medium tracking-wide text-xs xs:text-sm sm:text-base">
                    Connect
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    <a
                      href="mailto:hello@cyperstudio.in"
                      className="group flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition-all duration-300 text-xs xs:text-sm sm:text-base"
                    >
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </span>
                      hello@cyperstudio.in
                    </a>
                    <div className="flex gap-3 sm:gap-4">
                      {[
                        {
                          icon: FaTwitter,
                          href: "https://x.com/cyperstudioo",
                          label: "Twitter",
                        },
                        {
                          icon: FaGithub,
                          href: "https://github.com/dhirajgiri3",
                          label: "GitHub",
                        },
                        {
                          icon: FaLinkedin,
                          href: "https://www.linkedin.com/in/company/cyper-studio",
                          label: "LinkedIn",
                        },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                          <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 sm:mt-16 lg:mt-24 pt-4 sm:pt-6 lg:pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-[10px] xs:text-xs sm:text-sm tracking-wide">
              © {new Date().getFullYear()} Cyper Studio •
              <span className="inline-block ml-1 bg-gradient-to-r from-blue-400/90 to-purple-400/90 bg-clip-text text-transparent">
                Crafting Digital Excellence
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
