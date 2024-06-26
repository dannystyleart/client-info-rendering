import React from "react";
import { HistoryContextType } from "./history.types";
import { noop } from "../fingerprinting/utils";

export const HistoryContext = React.createContext<HistoryContextType>({
    initialized: false,
    consent: false,
    setConsent: noop,
    records: [],
    saveRecord: noop,
    deleteRecords: noop,
});