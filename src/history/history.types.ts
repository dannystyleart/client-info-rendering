export type HistoryRecord = {
    timestamp: number;
    deviceId: string;
    textImage: string;
    rendererInfo: string;
    languages: string;
    screenSize: string;
}

export type HistoryContextType = {
    initialized: boolean;
    setCurrentRecord: (record: HistoryRecord) => void;
    records: Array<HistoryRecord>;
    consent: boolean;
    toggleConsent: (consented: boolean) => void;
};

export const LOCAL_STORAGE_CONSENT_KEY = 'client_info_experiment_store_consent'
export const LOCAL_STORAGE_ENTRY_KEY = 'client_info_experiment_store';