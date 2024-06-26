import React, { useCallback, useMemo } from "react";
import { Header } from "../layout";
import { HistoryRecord, useHistory } from "../history";
import { useHistoryNavigation } from "../history-navigation";
import styles from './record-page-header.module.css';
import { Button, ButtonGroup } from "../button";

export const RecordPageHeader: React.FC<{ currentRecord?: HistoryRecord }> = ({ currentRecord }) => {
    const navigation = useHistoryNavigation();
    const { consent, toggleConsent } = useHistory();

    const canNavigate = useMemo(() => navigation.total > 1, [navigation]);
    const hasPrevPage = useMemo(() => canNavigate && navigation.currentIndex > 0, [canNavigate, navigation]);
    const hasNextPage = useMemo(() => canNavigate && navigation.currentIndex < navigation.total - 1, [canNavigate, navigation]);

    const handleToggleStorage = useCallback(() => {
        if (consent) {
            const confirm = window.confirm('Are you sure? Disabling storage will erease all your records and skips future records.');

            if (!confirm) return;
        }

        toggleConsent(!consent)
    }, [consent])

    return (
        <Header>
            <ButtonGroup>
                <Button disabled={!hasPrevPage} onClick={navigation.prevPage}>Prev</Button>
                <Button disabled={!hasNextPage} onClick={navigation.nextPage}>Next</Button>
                <span className={styles.pageCounter}>
                    {navigation.currentIndex + 1} / {navigation.total}
                </span>
            </ButtonGroup>
            <ButtonGroup className={styles.titleCell}>
                <h4>{currentRecord?.deviceId ?? 'N/A'}</h4>
                <p>{currentRecord ? new Date(currentRecord.timestamp).toLocaleString() : 'N/A'}</p>
            </ButtonGroup>
            <ButtonGroup className={styles.flexLastRight}>
                <Button onClick={handleToggleStorage}>
                    {consent ? 'Disable storage' : 'Enable storage'}
                </Button>
            </ButtonGroup>
        </Header>
    )
};