import React from 'react';

export const RocketIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14L8.5 17.5M12 14L15.5 17.5M12 14V4M4.5 16L6.5 20H17.5L19.5 16" stroke="url(#rocket-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="rocket-gradient" x1="4.5" y1="4" x2="19.5" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA"/>
        <stop offset="1" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SecurityIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="url(#shield-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16M8 12H16" stroke="url(#shield-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="shield-gradient" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA"/>
        <stop offset="1" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SparkleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" stroke="url(#sparkle-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="sparkle-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA"/>
        <stop offset="1" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);

export const ChartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21H3V3M7 14L12 9L16 13L21 8" stroke="url(#chart-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="chart-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA"/>
        <stop offset="1" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);
