
export const getToken = (key: string) => {
  const token: string | null = localStorage.getItem(key) || null;
  return token ? token : null;
};

export const setToken = (key: string, token: string) => localStorage.setItem(key, token);

export const removeToken = (key: string) => localStorage.removeItem(key);
