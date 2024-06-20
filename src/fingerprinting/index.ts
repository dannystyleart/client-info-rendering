import { getLanguages } from './language';
import { getScreenSize } from './screen';
import { getRenderedTextImage } from './canvas';
import { getWebglBasicInfo } from './webgl';
import { createShaHash } from './utils';
import { RenderingChallangeConfig } from './canvas/types';

export const getComponents = (textRendererConfig?: RenderingChallangeConfig) => ({
    canvas: getRenderedTextImage(document.createElement('canvas'), textRendererConfig),
    languages: getLanguages(),
    screen: getScreenSize(),
    webgl: getWebglBasicInfo(document.createElement('canvas')),
});

export type DeviceFingerPrintComponents = ReturnType<typeof getComponents>;

export const getFingerprintHash = (components?: DeviceFingerPrintComponents) => {
    const {
        canvas,
        languages,
        screen,
        webgl
    } = components || getComponents();

    const elements: Array<string> = [
        languages.join('+'),
        JSON.stringify(screen),
        JSON.stringify(webgl),
        canvas + '',
    ];

    return createShaHash(elements.join('|'));
}
