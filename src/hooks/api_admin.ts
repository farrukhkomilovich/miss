import axios, { AxiosRequestConfig, Method } from "axios";
import { getStorage } from "@/helpers/Storage";
import { admin_token } from "@/helpers/LS_KEYS";
import { removeToken } from "@/helpers/Tokens";
import i18n from "@/locales/i18next";
import { showToastify } from "@/helpers/show-toastify";

const BASE_URL = import.meta.env.VITE_API_URL + "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // CORS uchun
});

api.interceptors.request.use(
  (config) => {
    const token = getStorage(admin_token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      removeToken(admin_token);
      if (window.location.pathname !== "/admin-login") {
        window.location.href = "/admin-login";
      }
    }
    if (error.code === "ERR_NETWORK") {
      const lang = i18n.language as keyof typeof messages;
      const messages = {
        uz: "Tarmoqda muammo yuz berdi. Iltimos, qaytadan urinib ko'ring.",
        ru: "Произошла ошибка сети. Пожалуйста, попробуйте снова.",
      };
      showToastify({
        message: messages[lang] || messages["uz"],
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

/**
 * Umumiy API so‘rov funksiyasi
 * @param method - "GET", "POST", "PUT", "DELETE" va boshqalar
 * @param url - API endpoint masalan "/users"
 * @param data - So‘rov body yoki query param (GET uchun kerak bo‘lsa)
 * @param config - Qo‘shimcha konfiguratsiyalar (headers va h.k.)
**/

export const apiAdmin = async (method: Method, url: string, data?: unknown, config?: AxiosRequestConfig) => {
  
  try {
    const response = await api.request({ method, url, data, ...config });
    return response;
  } 

  catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message || "API xatosi";
      console.error(`[${method}] ${url} =>`, msg);
      throw new Error(error.message || "Unknown Axios error");
    } else {
      console.error("Noma'lum xatolik:", error);
      throw new Error("Tarmoq yoki ilova xatosi");
    }
  }
};
