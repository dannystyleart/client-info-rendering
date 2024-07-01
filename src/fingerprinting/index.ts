import { getLanguages } from './language';
import { getScreenSize } from './screen';
import { getRenderedTextImage } from './canvas';
import { getWebglBasicInfo } from './webgl';
import { createShaHash } from './utils';
import { RenderingChallangeConfig } from './canvas/types';
import { drawnApartFingerprint } from './drawn-apart'

export const getComponents = (textRendererConfig?: RenderingChallangeConfig) => ({
    canvas: getRenderedTextImage(document.createElement('canvas'), textRendererConfig),
    languages: getLanguages(),
    screen: getScreenSize(),
    webgl: getWebglBasicInfo(document.createElement('canvas')),
    drawnApart: drawnApartFingerprint(),
});

export type DeviceFingerPrintComponents = ReturnType<typeof getComponents>;

export const getFingerprintHash = (components?: DeviceFingerPrintComponents) => {
    const {
        canvas,
        languages,
        screen,
        webgl,
        drawnApart
    } = components || getComponents();

    const elements: Array<string> = [
        drawnApart+'',
        languages.join(','),
        [screen.width, screen.height].join('x'),
        webgl.renderer,
        canvas + '',
    ];

    return createShaHash(elements.join('|'));
}
