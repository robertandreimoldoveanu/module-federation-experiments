import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  const name = 'React Vite SWC'

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4  text-center">
      <p className="text-xl"><Link to={'/'}>MFE {name}</Link></p>
      <hr className="mt-8" />
      <div className="mt-8">
        <Link to={'/my-button'} className="p-6 hover:text-blue-600">Button</Link>
        <Link to={'/three'} className="p-6 hover:text-blue-600">Three</Link>
      </div>
      <hr className="mt-8" />
      <Outlet />
    </div>
  )
}

export default App
