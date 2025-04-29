// /constants/cardConstants.jsx

export const CARD_MIN_DIMENSIONS = {
    width: { xs: "100%", sm: "100%", md: "42vw", lg: "38vw", xl: "32vw" },
    height: { xs: "380px", sm: "420px", md: "45vh", lg: "50vh", xl: "55vh" },
  };
  
  export const LAYOUT_CONFIGS = {
    hero: { cols: 8, rows: 2, weight: 1 },
    large: { cols: 6, rows: 2, weight: 2 },
    wide: { cols: 6, rows: 1, weight: 2 },
    tall: { cols: 4, rows: 2, weight: 3 },
    normal: { cols: 4, rows: 1, weight: 4 },
    extraLarge: { cols: 8, rows: 1, weight: 5 },
};

export const MOBILE_LAYOUT = {
    xs: { cols: 1, gap: 16 },
    sm: { cols: 2, gap: 20 },
    md: { cols: 2, gap: 24 },
    lg: 'fluid',
    xl: { cols: 3, gap: 30 },
};
  
export const CATEGORIES = [
    { id: "live", label: "Live Projects", type: "liveProjects", color: "from-blue-900 to-blue-700", activeColor: "from-blue-600 to-blue-400" },
    { id: "development", label: "In Development", type: "inDevelopment", color: "from-purple-900 to-purple-700", activeColor: "from-purple-600 to-purple-400" },
    { id: "upcoming", label: "Coming Soon", type: "comingSoon", color: "from-violet-900 to-violet-700", activeColor: "from-violet-600 to-violet-400" },
  ];