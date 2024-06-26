import React from "react";
import { HistoryNavigationContext } from "./history-navigation.context";

export const useHistoryNavigation = () => React.useContext(HistoryNavigationContext);