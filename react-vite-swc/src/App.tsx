import { useState } from 'react'
import './App.css'
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import MyButton from './components/MyButton';
import './index.css';


const App = () => {
  const name = 'React Vite SWC'

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4  text-center">
      <p className="text-xl"><Link to={'/'}>MFE {name}</Link></p>
      <hr className="mt-8" />
      <div className="mt-8">
        <Link to={'my-button'} className="p-6 hover:text-blue-600">Button</Link>
        <Link to={'three'} className="p-6 hover:text-blue-600">Three</Link>
      </div>
      <hr className="mt-8" />
      <Outlet />
    </div>
  )
}

// export default App

const createRouter = (standalone: boolean) => createBrowserRouter([
  {
    path: standalone ? "" : "/vite",
    element: <App />,
    children: [
      {
        path: standalone ? "/my-button" : "/vite/my-button",
        element: <MyButton />
      },
      {
        path: standalone ? "/three" : "/vite/three",
        element: <p>Route three works!</p>
      }
    ]
  },
])
export const bootstrapViteComponent = (standalone: boolean) => {
  const router = createRouter(standalone);
  ReactDOM.createRoot(document.getElementById('vite-root') as HTMLElement).render(
    <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}