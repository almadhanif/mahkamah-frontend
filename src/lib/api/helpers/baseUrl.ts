import { BASE_PROXY } from "../endpoint";

export const baseURL = (proxy: keyof typeof BASE_PROXY): string => {
  return BASE_PROXY[proxy];
};
