import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Applications from "./components/Applications";
import LoginPage from "./components/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import store from "./store";
import { useSelector } from "react-redux";
import { UserInfo } from "./reducers/userSlice";

interface RootState {
  user: {
    user: UserInfo | {};
    isAuthenticated: boolean;
  };
}

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.user);
  const { isAuthenticated } = user;
  return isAuthenticated ? (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "application-log",
        element: <Applications />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
