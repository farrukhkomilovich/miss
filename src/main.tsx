// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ContextProvider from "./context/Context.tsx";
import AppRouter from "./App.tsx";
import "@/locales/i18next.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ContextProvider>
);
