import { getRenderConfig } from "./fingerprinting/canvas";

export const getCanvasConfigFromQueryString = () => {
  if (!location.search?.trim().length) return getRenderConfig();

  const parsedConfig = decodeURIComponent(location.search)
    ?.trim()
    .replace("?", "")
    .split("&")
    .reduce((all, current) => {
      const [key, value] = current.split("=");
      return {
        ...all,
        [key]: value
      };
    }, {});

  return getRenderConfig(parsedConfig);
};