import { RendererInfoErrorCode, RendererInfo } from "./useRendererInfo.types";

export class RenderInfoException extends Error {
  constructor(public code: RendererInfoErrorCode, message: string) {
    super(message);
  }
}

export const getRendererInfo = (
  canvasElement: HTMLCanvasElement
): RendererInfo => {
  if (!canvasElement) {
    throw new RenderInfoException(
      RendererInfoErrorCode.NO_CANVAS_ELEMENT,
      "HTMLCanvasElement is required to extract WebGL info"
    );
  }

  try {
    const gl =
      canvasElement.getContext("webgl2") ||
      canvasElement.getContext("webgl") ||
      (canvasElement.getContext("experimental-webgl") as WebGLRenderingContext);

    if (!gl)
      throw new RenderInfoException(
        RendererInfoErrorCode.NO_WEBGL_SUPPORT,
        "No WebGL rendering support"
      );

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (!debugInfo)
      throw new RenderInfoException(
        RendererInfoErrorCode.WEBGL_INFO_UNAVAILABLE,
        "No WebGL rendering info available"
      );

    return {
      renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    };
  } catch (e) {
    throw new RenderInfoException(
      RendererInfoErrorCode.NO_RENDERING_CONTEXT,
      "No rendering context could be fetched"
    );
  }
};
