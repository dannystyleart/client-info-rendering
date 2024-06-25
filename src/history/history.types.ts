export type HistoryRecord = {
    timestamp: number;
    deviceId: string;
    textImage: string;
    rendererInfo: string;
    languages: string;
    screenSize: string;
}

export type HistoryContextType = {
    records: Array<HistoryRecord>;
    saveRecord: (input: HistoryRecord) => void;
    deleteRecords: () => void;
};

export const LOCAL_STORAGE_ENTRY_KEY = 'client_info_experiment';