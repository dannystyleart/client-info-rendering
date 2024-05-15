import React, { useEffect, useMemo, useState } from "react";
import { useCanvasRenderer } from "./fingerprinting/useCanvasRenderer";
import { useRendererInfo } from "./fingerprinting/useRendererInfo";

import "./styles.css";
import { createShaHash, getCanvasConfigFromQueryString } from "./utils";
import { CopyContents } from "./copyContents";

export default function App() {
  const [rendererInfoError, rendererInfo] = useRendererInfo();
  const canvasSettings = useMemo(() => getCanvasConfigFromQueryString(), []);
  const canvasDataUrl = useCanvasRenderer(canvasSettings);
  const [deviceId, setDeviceId] = useState<string | undefined>();

  useEffect(() => {
    if (rendererInfo && canvasDataUrl) {
      createShaHash(
        `${JSON.stringify(rendererInfo)}${canvasDataUrl}`
      ).then((newId) => setDeviceId(newId));
    }
  }, [rendererInfo, canvasDataUrl]);

  return (
    <>
      <h1>Device</h1>
      <p><span id="device-id">{deviceId}</span> <CopyContents targetId="device-id" /></p>

      <h2>WebGL Renderer info <CopyContents targetId="renderer-info">Copy renderer info</CopyContents></h2>
      <code id="renderer-info" className={rendererInfoError && "error"}>
        {JSON.stringify(rendererInfoError ?? rendererInfo, null, 2)}
      </code>

      <h2>Canvas rendering challange</h2>
      <CopyContents targetId="canvas-data-url">Copy data url </CopyContents>

      <div id="canvas-details">
        <div>
          {canvasDataUrl && <img src={canvasDataUrl} alt="Rendered canvas image" />}
        </div>
        <div>
          <code>{JSON.stringify(canvasSettings, null, 2)}</code>
        </div>
      </div>

      <code id="canvas-data-url">{JSON.stringify(canvasDataUrl, null, 2)}</code>
    </>
  );
}
