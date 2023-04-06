// import { useState } from 'react'
import {
  // createBrowserRouter,
  // RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0)
  const name = "React Host ";

  return (
    <div className="mt-8 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4 text-center">
      <p className="text-xl">
        <Link to={"/"}>MFE {name}</Link>
      </p>
      <hr className="mt-8" />
      <div className="mt-8">
        <Link to={"my-button"} className="p-6 hover:text-blue-600">
          Button
        </Link>
        <Link to={"angular-mfe"} className="p-6 hover:text-blue-600">
          Angular MFE
        </Link>
      </div>
      <hr className="mt-8" />
      <div className="h-96 flex flex-row justify-evenly align-middle">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
{
  /* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */
}
