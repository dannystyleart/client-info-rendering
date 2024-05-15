export enum RendererInfoErrorCode {
  NO_RENDERING_CONTEXT = 1,
  NO_WEBGL_SUPPORT = 2,
  WEBGL_INFO_UNAVAILABLE = 3,
  NO_CANVAS_ELEMENT = 4
}

export type RendererInfo = { vendor: string; renderer: string };
