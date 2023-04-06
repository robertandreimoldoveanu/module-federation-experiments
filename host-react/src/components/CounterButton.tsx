import { useState } from "react";

function CounterButton() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center flex-grow h-full justify-around">
      <h1>Counter button</h1>
      <button className="border-2 border-sky-500 px-2 py-1" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <span>this is a component from react-host</span>
    </div>
  );
}

export default CounterButton;
