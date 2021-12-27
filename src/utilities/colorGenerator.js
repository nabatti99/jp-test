import { theme } from "@chakra-ui/react";

/**
 * Generate chakra color with opacity
 * @param {string} chakraColor <color>.<saturation>
 * @param {string} hexOpacity Alpha Hex value (00 -> FF)
 */
export const colorWithOpacity = (chakraColor, hexOpacity) => {
  const info = chakraColor.split(".");
  const color = info[0];
  const saturation = info[1];

  if (saturation) return `${theme.colors[color][saturation]}${hexOpacity}`;
  else return `${theme.colors[color]}${hexOpacity}`;
};
