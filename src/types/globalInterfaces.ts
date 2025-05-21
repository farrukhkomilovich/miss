import { IAdminDataTypes } from "./interfaces";

export interface IconActivity {
  className?: string;
  fill?: boolean;
  duotone?: boolean;
}

export interface ContextType {
  language?: string;
  setLanguage?: (lang: string) => void;
  theme?: string;
  setTheme?: (theme: "light" | "dark" | "system") => void;
  token?: string | null;
  role?: string;
  fetchUserData?: () => void;
  adminData: IAdminDataTypes | null;
  generateToken?: (value: string) => void;
  userGetLoading?: boolean;
  setAdminData?: (data: IAdminDataTypes) => void;
}

export interface RouteConfig {
  path?: string;
  element?: React.ReactNode;
  roles?: string[];
  children?: RouteConfig[];
  layout?: React.ReactNode;
  index?: boolean;
}

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  show: boolean;
  children?: MenuItem[];
}

