// /utils/layoutUtils.jsx

import { LAYOUT_CONFIGS } from "../constants/cardConstants";

export const calculateDynamicPadding = (width, height, variant) => {
  const basePadding = Math.min(width, height) * 0.05;
  const maxPadding = Math.min(width, height) * 0.1;
  const variantMultipliers = {
    hero: { base: 1.4, min: 24, max: 56 },
    wide: { base: 1.2, min: 20, max: 48 },
    vertical: { base: 1.1, min: 20, max: 44 },
    normal: { base: 1.0, min: 16, max: 40 },
  };
  const multiplier = variantMultipliers[variant] || variantMultipliers.normal;
  const calculatedPadding = Math.round(basePadding * multiplier.base);
  const finalPadding = Math.min(Math.max(calculatedPadding, multiplier.min), multiplier.max);
  return {
    padding: `${finalPadding}px`,
    contentSpacing: `${Math.round(finalPadding * 0.75)}px`,
    elementSpacing: `${Math.round(finalPadding * 0.5)}px`,
    innerPadding: `${Math.round(finalPadding * 0.3)}px`,
  };
};

export const generateGridLayout = (count) => {
  const layouts = [];
  let columnTracker = new Array(12).fill(0);

  const getOptimalPosition = (span) => {
    let minHeight = Math.min(...columnTracker);
    let bestStartCol = 0;
    for (let i = 0; i <= 12 - span; i++) {
      const maxHeightInSpan = Math.max(...columnTracker.slice(i, i + span));
      if (maxHeightInSpan <= minHeight) {
        minHeight = maxHeightInSpan;
        bestStartCol = i;
      }
    }
    return { startCol: bestStartCol, height: minHeight };
  };

  const assignPosition = (config, index) => {
    const { startCol, height } = getOptimalPosition(config.cols);
    const baseOffset = (height % 2) * 16;
    const randomOffset = Math.floor(Math.random() * 3 - 1) * 8;
    const offset = baseOffset + randomOffset;
    for (let col = startCol; col < startCol + config.cols; col++) {
      columnTracker[col] = height + config.rows;
    }
    return {
      colSpan: config.cols,
      rowSpan: config.rows,
      colStart: startCol + 1,
      offset,
      zIndex: count - index,
      variant: Object.keys(LAYOUT_CONFIGS).find((key) => LAYOUT_CONFIGS[key] === config),
    };
  };

  for (let i = 0; i < count; i++) {
    let config;
    if (i === 0) config = LAYOUT_CONFIGS.hero;
    else if (i === 1) config = LAYOUT_CONFIGS.large;
    else {
      const availableWidth = 12 - Math.max(...columnTracker);
      if (availableWidth >= 6) config = Math.random() > 0.5 ? LAYOUT_CONFIGS.wide : LAYOUT_CONFIGS.large;
      else if (availableWidth >= 4) config = Math.random() > 0.7 ? LAYOUT_CONFIGS.tall : LAYOUT_CONFIGS.normal;
      else config = LAYOUT_CONFIGS.normal;
    }
    layouts.push(assignPosition(config, i));
  }
  return layouts;
};