import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MyButton from './components/MyButton';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/my-button",
        element: <MyButton />
      },
      {
        path: "/three",
        element: <p>Route three works!</p>
      }
    ]
  },
])

export const bootstrapViteComponent = () => {
  ReactDOM.createRoot(document.getElementById('vite-root') as HTMLElement).render(
    <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}

bootstrapViteComponent();