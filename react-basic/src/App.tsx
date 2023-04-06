import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import "./index.scss";

 const App = () => {
  const name = 'React Basic';
  return <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4  text-center">
    <p className="text-xl">MFE {name}</p>
    <hr className="mt-8" />
    <div className="mt-8">
      <Link to={'/react/four'} className="p-6 hover:text-blue-600">Four</Link>
      <Link to={'/react/one'} className="p-6 hover:text-blue-600">One</Link>
    </div>
    <hr className="mt-8" />
    <Outlet />
  </div>
};

 const router = createBrowserRouter([
  {
    path: "/react",
    element: <App />,
    children: [
      {
        path: "/react/four",
        element: <p>Route four works!</p>
      },
      {
        path: "/react/one",
        element: <p>Conflict route one works!</p>
      }
    ]
  },
])


export const bootstrapReactComponent = (rootNode, angularInjector) => {
  // we can define custom hooks to get data from angular and leverage the injector
  // and maybe even use the angular router directly or trigger change detection and stuff
  // we could also use a shared library to share injection tokens and stuff
  console.log(angularInjector.get('FEDERATION_TOKEN'));
  ReactDOM.createRoot(rootNode).render(
    <RouterProvider router={router} />
  );
}