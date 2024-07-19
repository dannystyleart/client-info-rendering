import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { useCallback, useEffect, useState } from 'react';
import { Intro, useIntroState } from '../intro';
import { Container, Header } from '../layout';
import { RecordDetail } from '../record-page/record-detail.component';
import { createShaHash } from '../fingerprinting/utils';
import { ButtonGroup } from '../button';

export const ThumbmarkApp = () => {
    const [fingerprint, setFingerprint] = useState<any>();
    const [deviceId, setDeviceId] = useState<string>();

    useEffect(() => {
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