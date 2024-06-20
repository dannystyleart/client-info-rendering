import { WebglBasicInfoErrorCode, WebglBasicInfo } from "./types";

export class WebglBasicInfoException extends Error {
  constructor(public code: WebglBasicInfoErrorCode, message: string) {
    super(message);
  }
}

export const getWebglBasicInfo = (
  canvasElement: HTMLCanvasElement
): WebglBasicInfo => {
  if (!canvasElement) {
    throw new WebglBasicInfoException(
      WebglBasicInfoErrorCode.NO_CANVAS_ELEMENT,
      "HTMLCanvasElement is required to extract WebGL info"
    );
  }

  try {
    const gl =
      canvasElement.getContext("webgl2") ||
      canvasElement.getContext("webgl") ||
      (canvasElement.getContext("experimental-webgl") as WebGLRenderingContext);

    if (!gl)
      throw new WebglBasicInfoException(
        WebglBasicInfoErrorCode.NO_WEBGL_SUPPORT,
        "No WebGL rendering support"
      );

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (!debugInfo)
      throw new WebglBasicInfoException(
        WebglBasicInfoErrorCode.WEBGL_INFO_UNAVAILABLE,
        "No WebGL rendering info available"
      );

    return {
      renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      shaderLanguage: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
    }; 
  } catch (e) {
    throw new WebglBasicInfoException(
      WebglBasicInfoErrorCode.NO_RENDERING_CONTEXT,
      "No rendering context could be fetched"
    );
  }
};
