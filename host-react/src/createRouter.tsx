import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import PageOne from "./components/PageOne";
import PageLayout from "./components/PageLayout";
import RemoteMicrofrontend from "./components/RemoteMicrofrontend";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "",
      element: <App />,
      children: [
        {
          path: "/my-button",
          element: <PageOne />,
        },
        {
          path: "/angular-mfe",
          element: <PageLayout title="Page Three"><RemoteMicrofrontend/></PageLayout>,
        },
      ],
    },
  ]);
