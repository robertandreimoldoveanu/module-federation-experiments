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
    // meh hack cuz in "normal" application method we don't use the injector
    // if do have use cases for using the passed down angular injector in react
    // we'll need to ensure fallbacks for when the app runs in standalone mode, maybe
    bootstrapReactComponent(rootNode, {});
  }
});
