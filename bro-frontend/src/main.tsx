import React from "react";
import ReactDOM from "react-dom/client";
import { OidcConfiguration, OidcProvider } from "@axa-fr/react-oidc";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
// import Home from "./components/Home.tsx";

const oidcConfig: OidcConfiguration = {
  client_id: "bro-frontend",
  redirect_uri: window.location.origin + "/authentication/callback",
  silent_redirect_uri:
    window.location.origin + "/authentication/silent-callback",
  scope: "openid profile offline_access",
  authority: "http://localhost:8080/realms/bro-app",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OidcProvider configuration={oidcConfig}>
      <RouterProvider router={router} />
    </OidcProvider>
  </React.StrictMode>
);
