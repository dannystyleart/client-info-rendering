import { getRenderConfig } from "./fingerprinting/useCanvasRenderer";

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

export const createShaHash = async (input: string) => {
  const utf8 = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};
