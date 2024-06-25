import React, { useCallback, useEffect, useState } from "react";
import { HistoryContext } from "./history.context";
import { HistoryContextType, HistoryRecord } from "./history.types";
import { useHistoryStorage } from "./history.hooks";

export const HistoryContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const {deleteRecords, fetchRecords, saveRecords } =  useHistoryStorage();
    const [records, setRecords] = useState<HistoryContextType['records']>(fetchRecords());

    const saveRecord = useCallback((record: HistoryRecord)=>{
        const nextValue = records.concat(record);

        setRecords(()=> nextValue);

        saveRecords(nextValue);
    },[setRecords, records])

    return (
        <HistoryContext.Provider value={{saveRecord, deleteRecords, records}}>
            {children}
        </HistoryContext.Provider>
    )
};