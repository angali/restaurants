import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.API;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const PRODUCTION = publicRuntimeConfig.PRODUCTION;
export const DOMAIN = publicRuntimeConfig.DOMAIN;

export const HERE_API_ID = serverRuntimeConfig.HERE_API_ID;
export const HERE_API_KEY = serverRuntimeConfig.HERE_API_KEY;
export const HERE_API_DISCOVER_URL = publicRuntimeConfig.HERE_API_DISCOVER_URL;
export const HERE_API_LOOKUP_URL = publicRuntimeConfig.HERE_API_LOOKUP_URL;

export const GOOGLE_MAPS_API_KEY = publicRuntimeConfig.GOOGLE_MAPS_API_KEY;
