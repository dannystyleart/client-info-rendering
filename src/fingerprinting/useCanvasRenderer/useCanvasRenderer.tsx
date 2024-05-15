import { useEffect, useMemo, useRef, useState } from "react";
import { noop } from "../common";
import type { RenderingChallangeConfig } from "./useCanvasRenderer.types";
import { getRenderConfig } from "./getRenderConfig";

export const useCanvasRenderer = (config?: RenderingChallangeConfig) => {
  const ref = useRef(document.createElement("canvas"));
  const renderConfig = useMemo(() => getRenderConfig(config), [config]);
  const [computedValue, setComputedValue] = useState<string | undefined>();

  useEffect(() => {
    const {
      textContent,
      textColor,
      textShadow,
      fontSize,
      fontFamily,
      contrastColor,
      contrastWidth
    } = renderConfig;

    ref.current.height = fontSize * 2;

    const context = ref.current.getContext("2d");
    if (!context) return noop;

    context.clearRect(0, 0, ref.current.width, ref.current.height);

    context.textBaseline = "top";
    context.font = `${fontSize}px ${fontFamily}`;

    context.textBaseline = "alphabetic";
    context.fillStyle = contrastColor;
    context.fillRect(1, 1, contrastWidth, fontSize * 1.75);

    context.fillStyle = textColor;
    context.fillText(textContent, 2, 13);

    context.fillStyle = textShadow;
    context.fillText(textContent, 4, 15);

    setComputedValue(() => ref.current.toDataURL());
  }, [renderConfig]);

  return computedValue;
};
