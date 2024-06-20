import { isBrowserRuntime } from "../utils"

export const getScreenSize = () => {
    if(!isBrowserRuntime()) return { width: 0, height: 0 };

    const { availHeight, height, availWidth, width  } = window.screen;

    return {
        height: availHeight || height,
        width: availWidth || width
    };
}