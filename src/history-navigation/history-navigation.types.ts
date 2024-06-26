export type HistoryNavigationContextType = {
    currentIndex: number;
    total: number;
    nextPage: () => void;
    prevPage: () => void;
};