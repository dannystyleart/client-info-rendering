import type { RenderingChallangeConfig } from "./types";

export const getRenderConfig = (config?: RenderingChallangeConfig) => {
  const {
    textContent = `Canvas challange 1.0 ${String.fromCharCode(55357, 56835)}`,
    textColor = "#069",
    textShadow = "rgba(102, 204, 0, .63)",
    contrastColor = "#F60",
    contrastWidth,
    fontSize = 14,
    fontFamily = '"Times New Roman"'
  } = config || {};

  return {
    textContent,
    textColor,
    textShadow,
    contrastColor,
    contrastWidth: contrastWidth || textContent.length,
    fontSize,
    fontFamily
  };
};
