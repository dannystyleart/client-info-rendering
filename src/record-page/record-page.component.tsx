import { useCallback, useMemo } from "react";
import { Button } from "../button";
import { useHistory } from "../history";
import { useHistoryNavigation } from "../history-navigation";
import { Container } from "../layout";
import { RecordPageHeader } from "./record-page-header.component";
import { RecordDetail, RecordDetailImage } from "./record-detail.component";

export const RecordPage = () => {
    const navigation = useHistoryNavigation();
    const { records } = useHistory();

    const currentRecord = useMemo(() => records[navigation.currentIndex], [navigation.currentIndex]);

    const handleCopyRecordDetails = useCallback(() => {
        window.navigator.clipboard.writeText(
            JSON.stringify(currentRecord, null, 2)
        );

        window.alert('Copied!')
    }, [currentRecord])

    const factorNames = useMemo(()=>{
        if(!currentRecord) return null;

        return Object.keys(currentRecord).filter((key)=>!['timestamp', 'deviceId'].includes(key)).join(' + ');
    },[currentRecord])

    return (
        <>
            <RecordPageHeader currentRecord={currentRecord} />
            <Container>

                <Button disabled={!currentRecord} variant="large" onClick={handleCopyRecordDetails}>
                    Copy details
                </Button>

                <section>
                    <h2>Device Id</h2>
                    <RecordDetail>
                        Generated of: {factorNames}
                    </RecordDetail>
                    <RecordDetail>
                        {currentRecord?.deviceId || 'N/A'}
                    </RecordDetail>
                </section>

                <section>
                    <h2>Screen</h2>
                    <RecordDetail>
                        {currentRecord?.screenSize || 'N/A'}
                    </RecordDetail>
                </section>

                <section>
                    <h2>Language</h2>
                    <RecordDetail>
                        {currentRecord?.languages || 'N/A'}
                    </RecordDetail>
                </section>

                <section>
                    <h2>WebGL Renderer</h2>
                    <RecordDetail>
                        {currentRecord?.rendererInfo || 'N/A'}
                    </RecordDetail>
                </section>

                <section>
                    <h2>WebGL 'Drawn Apart'</h2>
                    <RecordDetail>
                        {currentRecord?.drawnApart || 'N/A'}
                    </RecordDetail>
                </section>

                <section>
                    <h2>Canvas image</h2>
                    <RecordDetailImage src={currentRecord?.textImage} />
                    <RecordDetail>
                        {currentRecord?.textImage || 'N/A'}
                    </RecordDetail>
                </section>
            </Container>
        </>
    )
}