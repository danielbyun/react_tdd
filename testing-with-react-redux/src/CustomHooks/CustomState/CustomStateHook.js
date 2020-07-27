import React, { Fragment } from "react";
import { useCounter } from "./useCounter";

const CustomStateHook = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <Fragment>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </Fragment>
  );
};

export default CustomStateHook;
