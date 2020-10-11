import { randomColor } from "randomcolor";

export const randomColorGenerator = (lumin) => {
  const ranColor = randomColor({
    luminosity: lumin || "light",
    format: "rgba",
    alpha: 0.5, // e.g. 'rgba(9, 1, 107, 0.5)',
  });

  return ranColor;
};
