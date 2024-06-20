import { RenderingChallangeConfig } from "./types";
import { getRenderConfig } from "./getRenderConfig";

export {getRenderConfig};

export const getRenderedTextImage = (element: HTMLCanvasElement, config?: RenderingChallangeConfig)=>{
    const {
        textContent,
        textColor,
        textShadow,
        fontSize,
        fontFamily,
        contrastColor,
        contrastWidth
    } = getRenderConfig(config);

    element.height = fontSize * 2;

    const context = element.getContext("2d");

    if(!context) return null;

    context.clearRect(0, 0, element.width, element.height);

    context.textBaseline = "top";
    context.font = `${fontSize}px ${fontFamily}`;

    context.textBaseline = "alphabetic";
    context.fillStyle = contrastColor;
    context.fillRect(1, 1, contrastWidth, fontSize * 1.75);

    context.fillStyle = textColor;
    context.fillText(textContent, 2, 13);

    context.fillStyle = textShadow;
    context.fillText(textContent, 4, 15);

    return element.toDataURL();
}