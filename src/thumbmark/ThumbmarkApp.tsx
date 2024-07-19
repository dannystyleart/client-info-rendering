import { getFingerprint, setOption } from '@thumbmarkjs/thumbmarkjs';
import { useEffect, useState } from 'react';
import { createShaHash } from '../fingerprinting/utils';
import { Container, Header } from '../layout';
import { RecordDetail } from '../record-page/record-detail.component';

export const ThumbmarkApp = () => {
    const [fingerprint, setFingerprint] = useState<any>();
    const [deviceId, setDeviceId] = useState<string>();

    useEffect(() => {

        setOption('exclude', ['screen', 'system.browser.version']);

        getFingerprint(true).then((values) => {
            setFingerprint(values);

            if (typeof values !== 'string') {
                return createShaHash(values.hash);
            } else {
                return createShaHash(values);
            }
        }).then((hash) => {
            setDeviceId(hash)
        })
    }, []);

    const handleCopy = () => {
        window.navigator.clipboard.writeText(
            JSON.stringify({
                deviceId,
                ...fingerprint,
            }, null, 2)
        );

        window.alert('Copied!');
    };

    return (
        <>
            <Header>
                <h4>{deviceId ?? 'N/A'}</h4>
                <p><small>SHA256 of the hash provided by thumbmark</small></p>
            </Header>
            <Container>
                <section>
                    <h2>Components</h2>
                    <button onClick={handleCopy}>Copy</button>
                    <RecordDetail>
                        {fingerprint ? (
                            <pre>
                                {JSON.stringify(fingerprint, null, 2)}
                            </pre>
                        ) : 'N/A'}
                    </RecordDetail>
                </section>
            </Container>
        </>
    )
};