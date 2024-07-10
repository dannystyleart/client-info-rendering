import { getLanguages } from './language';
import { getScreenSize } from './screen';
import { getRenderedTextImage } from './canvas';
import { getWebglBasicInfo } from './webgl';
import { createShaHash } from './utils';
import { RenderingChallangeConfig } from './canvas/types';
import { drawnApartFingerprint } from './drawn-apart'
import { getAudioFingerprint} from "./audio";

export const getComponents = async (textRendererConfig?: RenderingChallangeConfig) => ({
    canvas: getRenderedTextImage(document.createElement('canvas'), textRendererConfig),
    languages: getLanguages(),
    screen: getScreenSize(),
    webgl: getWebglBasicInfo(document.createElement('canvas')),
    drawnApart: drawnApartFingerprint(),
    audio: await getAudioFingerprint(),
});

export type DeviceFingerPrintComponents = ReturnType<typeof getComponents>;

export const getFingerprintHash = (components: Awaited<DeviceFingerPrintComponents>) => {
    const {
        canvas,
        webgl,
        audio,
    } = components;

    const elements: Array<string> = [
        canvas + '',
        webgl.renderer,
        audio + '',
    ];

    return createShaHash(elements.join('|'));
}
