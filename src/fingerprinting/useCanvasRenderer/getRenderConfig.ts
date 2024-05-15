import type { RenderingChallangeConfig } from "./useCanvasRenderer.types";

const SYSTEM_FONTS =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const getRenderConfig = (config?: RenderingChallangeConfig) => {
  const {
    textContent = "Canvas challange 1.0",
    textColor = "#069",
    textShadow = "rgba(102, 204, 0, .63)",
    contrastColor = "#F60",
    contrastWidth,
    fontSize = 14,
    fontFamily = SYSTEM_FONTS
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
