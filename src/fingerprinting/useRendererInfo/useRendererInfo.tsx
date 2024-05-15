import { useEffect, useRef, useState } from "react";
import { RendererInfoErrorCode, RendererInfo } from "./useRendererInfo.types";
import { getRendererInfo, RenderInfoException } from "./getRendererInfo";

export const useRendererInfo = () => {
  const ref = useRef(document.createElement("canvas"));
  const [error, setError] = useState<
    undefined | { code: RendererInfoErrorCode; message: string }
  >();
  const [computedValue, setComputedValue] = useState<RendererInfo>();

  useEffect(() => {
    try {
      const rendererInfo = getRendererInfo(ref.current);
      setComputedValue(rendererInfo);
    } catch (e) {
      if (e instanceof RenderInfoException) {
        setError({
          code: e.code,
          message: e.message
        });
      }
    }
  }, []);

  return [error, computedValue];
};
