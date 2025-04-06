export const appInfo = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
  prodDir: import.meta.env.VITE_API_PRODUCT_DIRECTORY_URL,
};

export const apiUrl = appInfo.apiUrl;
export const prodDir = appInfo.prodDir;
