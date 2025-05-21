export const setStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const getStorage = (key: string) => {
  const item = JSON.stringify(localStorage.getItem(key));
  return item ? JSON.parse(item) : null;
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLanguage = (): string => {
  return localStorage.getItem("i18nextLng") || "ru";
};

export const setLanguage = (lang: string) => {
  localStorage.setItem("i18nextLng", lang);
};

export const removeLanguage = () => {
  localStorage.removeItem("i18nextLng");
};
