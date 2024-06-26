import { useContext } from "react"
import { HistoryContext } from "./history.context"
import { HistoryRecord, LOCAL_STORAGE_CONSENT_KEY, LOCAL_STORAGE_ENTRY_KEY } from "./history.types";

export const useHistory = () => useContext(HistoryContext);

export const useHistoryStorage = () => {
    const fetchConsent = () => {
        const value = localStorage.getItem(LOCAL_STORAGE_CONSENT_KEY);
        return value === 'true';
    };

    const persistConsent = (canStore: boolean) => {
        localStorage.setItem(LOCAL_STORAGE_CONSENT_KEY, JSON.stringify(canStore === true));
    };

    const fetchRecords = () => {
        const values = localStorage.getItem(LOCAL_STORAGE_ENTRY_KEY);

        if (!values) return [] as Array<HistoryRecord>;

        try {
            const entries = JSON.parse(values);
            return entries as Array<HistoryRecord>;
        } catch (e) {
            console.error('[Storage]: Failed to read previous records');
            return [] as Array<HistoryRecord>;
        }
    };

    const persistRecords = (input: Array<HistoryRecord>) => {
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

    return {
        records: { fetch: fetchRecords, persist: persistRecords, delete: deleteRecords },
        consent: { fetch: fetchConsent, persist: persistConsent }
    };
};