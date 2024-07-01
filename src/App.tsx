import { useCallback, useEffect } from "react";

import { getCanvasConfigFromQueryString } from "./customCanvasConfig";
import { getComponents, getFingerprintHash } from "./fingerprinting";
import { HistoryRecord, useHistory } from "./history";
import { Intro, useIntroState } from "./intro";
import "./styles.css";
import { HistoryNavigationProvider } from "./history-navigation";
import { RecordPage } from "./record-page";

export default function App() {
  const [showIntro, setIntroSeen] = useIntroState();

  const { initialized, toggleConsent, setCurrentRecord, records } = useHistory();

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
          languages: components.languages.join(','),
          textImage: components.canvas + '',
          drawnApart: components.drawnApart + ''
        };

        setCurrentRecord(record);
      });
    }
  }, [initialized]);

  const handleIntroClose = useCallback((canStoreRecords: boolean) => {
    setIntroSeen();
    toggleConsent(canStoreRecords);
  }, [setIntroSeen, toggleConsent]);

  if (showIntro) return (<Intro onClose={handleIntroClose} />)

  if (!initialized && !records[0]) return null;

  return (
    <HistoryNavigationProvider records={records}>
      <RecordPage />
    </HistoryNavigationProvider>
  )
}
