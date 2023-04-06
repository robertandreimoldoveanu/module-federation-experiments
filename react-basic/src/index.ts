import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";

import("./App").then(({ bootstrapReactComponent }) => {
  const rootNode = document.getElementById("react-app");
  if (rootNode) {
    bootstrapReactComponent(rootNode);
  }
});
