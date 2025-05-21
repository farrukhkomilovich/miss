// context/ContextProvider.tsx
import { useState, useEffect, useMemo, ReactNode } from "react";
import { DataContext } from "./DataContext";
import i18next from "i18next";
import { getStorage, setStorage } from "@/helpers/Storage";
import { admin_token, theme_key } from "@/helpers/LS_KEYS";
import { getToken } from "@/helpers/Tokens";

type Theme = "light" | "dark" | "system";

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  const storedTheme = typeof window !== "undefined" ? getStorage(theme_key) : null;
  const systemTheme = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState<Theme>(
    storedTheme === "dark" ||
      storedTheme === "light" ||
      storedTheme === "system"
      ? storedTheme
      : systemTheme
  );

  const changeLanguage = (lang: "uz" | "ru") => i18next.changeLanguage(lang);

  const changeTheme = (newTheme: Theme) => {
    if (!["light", "dark", "system"].includes(newTheme)) return;
    setTheme(newTheme);
    setStorage(theme_key, newTheme);
  };

  useEffect(() => {    
    const token = getToken(admin_token);
    setToken(token);
    if (!token && typeof window !== "undefined" && window.location.pathname !== "/admin-login") {
      window.location.pathname = "/admin-login";
    }
  }, [token]);



  const contextValue = useMemo(
    () => ({
      setLanguage: changeLanguage,
      theme, 
      setTheme: changeTheme,
      token, 
      generateToken: setToken,
    }),
    [theme, token]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
