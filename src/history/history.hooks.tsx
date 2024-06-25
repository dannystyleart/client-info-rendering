import { useContext } from "react"
import { HistoryContext } from "./history.context"
import { HistoryRecord, LOCAL_STORAGE_ENTRY_KEY } from "./history.types";

export const useHistory = () => useContext(HistoryContext);

export const useHistoryStorage = () => {
    const fetchRecords = () => {
        const values = localStorage.getItem(LOCAL_STORAGE_ENTRY_KEY);

        if(!values) return [] as Array<HistoryRecord>;
        
        try {
            const entries = JSON.parse(values);
            return entries as Array<HistoryRecord>;
        } catch (e) {
            console.error('[Storage]: Failed to read previous records');
            return [] as Array<HistoryRecord>;
        }
    };

    const saveRecords = (input: Array<HistoryRecord>) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_ENTRY_KEY, JSON.stringify(input));
            return true;
        } catch (e) {
            console.error('[Storage]: Could not store records.');
            return false;
        }
    };

    const deleteRecords = () => {
        localStorage.setItem(LOCAL_STORAGE_ENTRY_KEY, '');
    };

    return { fetchRecords, saveRecords, deleteRecords }
};