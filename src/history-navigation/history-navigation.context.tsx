import React from "react";
import { HistoryNavigationContextType } from "./history-navigation.types";
import { noop } from "../fingerprinting/utils";

export const HistoryNavigationContext = React.createContext<HistoryNavigationContextType>({
    currentIndex: 0,
    total: 0,
    nextPage: noop,
    prevPage: noop
});