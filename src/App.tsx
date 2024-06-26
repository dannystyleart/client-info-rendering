import { useCallback, useEffect, useMemo, useState } from "react";

import { CopyContents } from "./copyContents";
import { getCanvasConfigFromQueryString } from "./customCanvasConfig";
import { getComponents, getFingerprintHash } from "./fingerprinting";
import { HistoryRecord, useHistory } from "./history";
import { Intro, useIntroState } from "./intro";
import { Container, Header } from "./layout";
import "./styles.css";

type NavigationState = {
  canNavigate: boolean;
  currentIndex: number;
  total: number
};

export default function App() {
  const [showIntro, setIntroSeen] = useIntroState();

  const { initialized, saveRecord, consent, records, setConsent, deleteRecords } = useHistory();

  const [navigation, setNavigationState] = useState<NavigationState>({
    canNavigate: false,
    currentIndex: 0,
    total: 0
  });

  const handleClearHistory = () => {
    const confirmation = window.confirm('Are you sure you clear and disable the storage of records?');
    if (confirmation) {
      setConsent(false);
      deleteRecords();
      window.location.reload()
    }
  }

  const handleEnableHistory = () => {
    setConsent(true);
    window.location.reload();
  }

  const currentRecord = useMemo(() => {
    return records?.[navigation.currentIndex];
  }, [navigation, records]);


  const handleNav = useCallback((direction: number) => () => {
    const nextIndex = navigation.currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < navigation.total) {
      setNavigationState({
        ...navigation,
        currentIndex: navigation.currentIndex + direction,
      })
    }
  }, [setNavigationState, navigation, currentRecord])

  const copyDebugInfo = () => {
    const contents = JSON.stringify(currentRecord, null, 2);

    navigator.clipboard.writeText(contents);

    alert('Debug information copied!');
  }

  useEffect(() => {
    if (initialized) {
      const components = getComponents(
        getCanvasConfigFromQueryString(),
      );

      getFingerprintHash(components).then((fingerprint) => {

        const record: HistoryRecord = {
          timestamp: Date.now(),
          deviceId: fingerprint,
          rendererInfo: components.webgl.renderer,
          screenSize: [components.screen.width, components.screen.height].join('x'),
          languages: components.languages.join(','),
          textImage: components.canvas + ''
        }

        saveRecord(record);

        setNavigationState({
          canNavigate: consent ? records.length > 1 : false,
          currentIndex: 0,
          total: records.length
        })
      });
    }

  }, [initialized]);

  const handleIntroClose = useCallback((canStoreRecords: boolean) => {
    setIntroSeen();
    setConsent(canStoreRecords);
  }, [setIntroSeen, setConsent]);

  return (
    <>
      <Header>
        <div>
          {!consent ? (
            <button onClick={handleEnableHistory}>Enable history</button>
          ) : (
            <button onClick={handleClearHistory}>Clear history</button>
          )}

        </div>

        <div>
          <button disabled={navigation.canNavigate && navigation.currentIndex === 0} onClick={handleNav(-1)}>Newer</button>
          <button disabled={navigation.canNavigate && navigation.currentIndex === navigation.total - 1} onClick={handleNav(1)}>Older</button>
          {navigation.currentIndex + 1} / {navigation.total}
        </div>

        <p><strong>{currentRecord?.deviceId}</strong></p>
        <p>Generated on: {new Date(currentRecord?.timestamp).toLocaleString()}</p>
      </Header >

      <Container>

        {showIntro && <Intro onClose={handleIntroClose} />}

        <h1>Device</h1>
        <p><span id="device-id">{currentRecord?.deviceId}</span> <CopyContents targetId="device-id" /></p>

        <button onClick={copyDebugInfo}>Copy Debug information</button>

        <h2>Screen</h2>
        <code id="screen">
          {currentRecord?.screenSize}
        </code>

        <h2>Language</h2>
        <code id="language">
          {currentRecord?.languages}
        </code>

        <h2>WebGL Renderer info</h2>
        <code id="renderer-info">
          {currentRecord?.rendererInfo}
        </code>

        <h2>Canvas rendering challange</h2>
        <div id="canvas-details">
          <div>
            {currentRecord?.textImage && <img src={currentRecord?.textImage} alt="Rendered canvas image" />}
          </div>
        </div>
        <code id="canvas-data-url">{JSON.stringify(currentRecord?.textImage, null, 2)}</code>
      </Container>
    </>
  );
}
