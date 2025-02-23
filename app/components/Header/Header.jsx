"use client";

import React from "react";
import Link from "next/link";
import logo from "../../../public/Assets/Image/cyper-logo/cyper-dark-logo.png";
import Image from "next/image";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Header({ onToggleSidebar, isChecked }) {
  const LinkItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/About",
    },
    {
      name: "Services",
      link: "/Services",
    },
    {
      name: "Contact",
      link: "/Contact",
    },
  ];

  return (
    <header className="flex justify-between items-center px-8 py-2 bg-white/80 backdrop-blur-lg fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-[94vw] self-center rounded-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/20 transition-all duration-300">
      <Link
        href="/"
        className="no-underline outline-none hover:outline-none focus:outline-none transition-transform duration-300 hover:scale-105"
      >
        <Image
          src={logo}
          alt="Cyper Logo"
          className="h-[42px] w-[42px] object-contain"
        />
      </Link>

      <nav className="hidden md:flex justify-center items-center gap-16">
        {LinkItems.map((item, index) => (
          <li key={index} className="relative list-none">
            <Link href={item.link}>
              <p className="text-[var(--dark)] font-medium text-base transition-all duration-300 hover:text-[var(--primary)] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[var(--primary)] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
                {item.name}
              </p>
            </Link>
          </li>
        ))}
      </nav>

      <div className="flex justify-center items-center gap-10 md:gap-12">
        <li className="w-full h-full m-0 p-0 flex flex-col items-center justify-center relative list-none">
          <Link href="/Contact">
            <PrimaryButton
              withParticles={true}
              withRipple={true}
              className="w-full h-full hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </PrimaryButton>
          </Link>
        </li>

        <div className="bar">
          <button 
            onClick={onToggleSidebar}
            className={`relative z-[1002] flex items-center justify-center rounded-full p-2.5 cursor-pointer transition-all duration-500 border border-slate-200/60 hover:border-[var(--primary)] bg-white/10 hover:bg-white group ${
              isChecked ? 'border-[var(--primary)] bg-[var(--primary)]/5 scale-110' : 'hover:scale-100'
            }`}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 top-0.5 h-[3px] rounded-full bg-slate-700 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] origin-[70%_50%] ${
                isChecked ? 'rotate-[45deg] translate-y-[9px] translate-x-[1px] bg-[var(--primary)] w-full' : 'w-[70%]'
              } group-hover:bg-[var(--primary)] group-hover:w-full`}></span>
              
              <span className={`absolute left-0 top-1/2 -translate-y-[2px] h-[3px] w-full rounded-full bg-slate-700 transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
                isChecked ? 'opacity-0 translate-x-3 scale-0' : 'delay-75'
              } group-hover:bg-[var(--primary)]`}></span>
              
              <span className={`absolute left-0 bottom-0.5 h-[3px] rounded-full bg-slate-700 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] origin-[70%_50%] ${
                isChecked ? '-rotate-[45deg] -translate-y-[9px] translate-x-[1px] bg-[var(--primary)] w-full' : 'w-[42%]'
              } group-hover:bg-[var(--primary)] group-hover:w-full`}></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
