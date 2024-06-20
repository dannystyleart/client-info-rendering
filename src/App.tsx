import React, { useEffect, useState } from "react";

import "./styles.css";
import { CopyContents } from "./copyContents";
import { DeviceFingerPrintComponents, getComponents, getFingerprintHash } from "./fingerprinting";
import { getCanvasConfigFromQueryString } from "./customCanvasConfig";

export default function App() {
  const [components, setComponents] = useState<DeviceFingerPrintComponents>();
  const [deviceId, setDeviceId] = useState<string>();

  const copyDebugInfo = () => {
    const contents = JSON.stringify({
      ...components,
      deviceId,
    }, null, 2);

    navigator.clipboard.writeText(contents);

    alert('Debug information copied!');
  }

  useEffect(()=>{
    const components = getComponents(
      getCanvasConfigFromQueryString(),
    );

    getFingerprintHash(components).then((fingerprint)=>{
      setComponents(components);
      setDeviceId(fingerprint);
    });
  },[])

  return (
    <>
      <h1>Device</h1>
      <p><span id="device-id">{deviceId}</span> <CopyContents targetId="device-id" /></p>

      <button onClick={copyDebugInfo}>Copy Debug information</button>

      <h2>Screen</h2>
      <code id="screen">
        {[components?.screen?.width, components?.screen?.height].join(' x ')}
      </code>

      <h2>Language</h2>
      <code id="language">
        {components?.languages?.join(', ')}
      </code>

      <h2>WebGL Renderer info</h2>
      <code id="renderer-info">
        {JSON.stringify(components?.webgl, null, 2)}
      </code>

      <h2>Canvas rendering challange</h2>
      <div id="canvas-details">
        <div>
          {components?.canvas && <img src={components?.canvas} alt="Rendered canvas image" />}
        </div>
      </div>
      <code id="canvas-data-url">{JSON.stringify(components?.canvas, null, 2)}</code>
    </>
  );
}
