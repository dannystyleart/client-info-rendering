import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HistoryRecord } from "../history/history.types";
import { HistoryNavigationContext } from "./history-navigation.context";

const withinThreshold = (value: number, min: number, max: number) => {
    if (value > max) return max;
    if (value < min) return min;

    return value;
}

export const HistoryNavigationProvider: React.FC<React.PropsWithChildren<{ records: Array<HistoryRecord> }>> = ({
    records,
    children
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        setCurrentIndex(
            withinThreshold(currentIndex, 0, records.length - 1)
        );
    }, [records]);

    const navigate = (direction: -1 | 1) => {
        setCurrentIndex(
            withinThreshold(currentIndex + direction, 0, records.length - 1)
        );
    };

    const nextPage = useCallback(() => navigate(1), [navigate])
    const prevPage = useCallback(() => navigate(-1), [navigate])

    return (
        <HistoryNavigationContext.Provider value={{
            currentIndex,
            total: records.length,
            nextPage,
            prevPage,
        }}>
            {children}
        </HistoryNavigationContext.Provider>
    )
};