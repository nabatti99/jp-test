import { theme } from "@chakra-ui/react";

/**
 * Generate chakra color with opacity
 * @param {string} chakraColor <color>.<saturation>
 * @param {string} hexOpacity Alpha Hex value (00 -> FF)
 */
export const colorWithOpacity = (chakraColor, hexOpacity) => {
  const [color, saturation] = chakraColor.split(".");
  return `${theme.colors[color][saturation]}${hexOpacity}`;
};
