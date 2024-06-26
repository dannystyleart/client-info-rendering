import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HistoryContext } from "./history.context";
import { HistoryContextType, HistoryRecord } from "./history.types";
import { useHistoryStorage } from "./history.hooks";

const getDescendingOrder = (list: Array<HistoryRecord>) => list.sort((left, right) => {
    return left.timestamp > right.timestamp ? -1 : 1;
});

export const HistoryContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const storageApi = useHistoryStorage();
    const [consent, setConsentState] = useState<boolean>(false);
    const [recordsStore, setRecordsStore] = useState<HistoryContextType['records']>([]);
    const [initialized, setInitializedState] = useState<boolean>(false)
    const [currentRecord, setCurrentRecordState] = useState<HistoryRecord>();

    const loadRecords = (isConsented: boolean) => {
        if (!isConsented) {
            setRecordsStore([]);
            return;
        }

        const records = storageApi.records.fetch();
        setRecordsStore(records);
    };

    useEffect(() => {
        const storedConsent = storageApi.consent.fetch();
        setConsentState(storedConsent);
        loadRecords(storedConsent);
        setInitializedState(true);
    }, []);

    const toggleConsent = useCallback((isConsented: boolean) => {
        setConsentState(isConsented);
    }, []);

    useEffect(() => {
        if (initialized) {
            storageApi.consent.persist(consent);

            if (!consent) {
                storageApi.records.delete();
                setRecordsStore([]);
            } else if (consent) {
                loadRecords(consent);
            }
        }

    }, [consent, initialized]);

    const records = useMemo(() => {
        if (!initialized) return [];
        if (!consent) return !!currentRecord ? [currentRecord] : [];

        const currentAlreadyStored = recordsStore.some((stored) => {
            return stored.timestamp === currentRecord?.timestamp && stored.deviceId === currentRecord?.deviceId;
        });

        if (!currentRecord || currentAlreadyStored) return getDescendingOrder(recordsStore);

        return getDescendingOrder(recordsStore.concat(currentRecord));

    }, [initialized, consent, recordsStore, currentRecord]);

    const setCurrentRecord = useCallback((record: HistoryRecord) => {
        setCurrentRecordState(record);

        if (consent) {
            storageApi.records.persist(
                getDescendingOrder(recordsStore.concat(record))
            );
        }
    }, [consent, recordsStore])
    return (
        <HistoryContext.Provider value={{
            initialized,
            records,
            setCurrentRecord,
            consent,
            toggleConsent
        }}>
            {children}
        </HistoryContext.Provider>
    )
};