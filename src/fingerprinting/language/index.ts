import { isBrowserRuntime } from "../utils"

export const getLanguages = () => {
    if(!isBrowserRuntime()) return [];

    return window.navigator.languages;
}