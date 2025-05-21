import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { publicRoutes, privateRoutes, fallbackRoutes } from "./routes/Routes";
import { RouteConfig } from "./types/globalInterfaces";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStorage } from "./helpers/Storage";
import { admin_token } from "./helpers/LS_KEYS";

const renderRoutes = (routes: RouteConfig[], role: string | null): React.ReactNode[] => {
  return routes
    .filter((route) => {
      if (!route.roles) return true;
      return role && route.roles.includes(role);
    })
    .map((route) => {
      const children = route.children
        ? renderRoutes(route.children, role)
        : null;

      return route.layout ? (
        <Route key={route.path} element={route.layout}>
          <Route path={route.path} element={route.element}>
            {children}
          </Route>
        </Route>
      ) : (
        <Route key={route.path} path={route.path} element={route.element}>
          {children}
        </Route>
      );
    });
};

const AppRouter = () => {
  const { token } = useContext(DataContext);
  const activeRoutes = token || getStorage(admin_token)
      ? [...privateRoutes, ...publicRoutes]
      : publicRoutes;

  const routes = createRoutesFromElements(
    <>
      {renderRoutes(activeRoutes)}
      {fallbackRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};
export default AppRouter;
