import React, { useCallback, useEffect, useState } from "react";
import { HistoryContext } from "./history.context";
import { HistoryContextType, HistoryRecord } from "./history.types";
import { useHistoryStorage } from "./history.hooks";

export const HistoryContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const {deleteRecords, fetchRecords, persistRecords, fetchConsent, persistConsent } =  useHistoryStorage();
    const [records, setRecords] = useState<HistoryContextType['records']>([]);
    const [consent, setConsentState] = useState<boolean>(false);

    useEffect(()=>{
        const consentValue = fetchConsent();
        setConsentState(consentValue);

        if(consentValue){
            const recordsFetched = fetchRecords();
            setRecords(recordsFetched);
        }
    },[]);

    const saveRecord = useCallback((record: HistoryRecord)=>{
        const nextValue = records.concat(record);

        setRecords(()=> nextValue);

        if(consent) persistRecords(nextValue);
    },[setRecords, records]);

    const clearRecords = useCallback(()=>{
        deleteRecords();
        setRecords([]);
    },[setRecords, deleteRecords]);

    const setConsent = useCallback((canStore: boolean)=>{
        setConsentState(canStore);

        if(!canStore) deleteRecords();

        persistConsent(canStore);
    },[setConsentState, deleteRecords, persistConsent])

    return (
        <HistoryContext.Provider value={{saveRecord, deleteRecords: clearRecords, records, consent, setConsent}}>
            {children}
        </HistoryContext.Provider>
    )
};