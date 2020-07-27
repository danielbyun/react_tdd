import React, { Fragment } from "react";
import { useMousePosition } from "./useMousePosition";

const CustomSubscriptionHook = () => {
  const position = useMousePosition();
  return (
    <Fragment>
      <p>x: {position.x}</p>
      <p>y: {position.y}</p>
    </Fragment>
  );
};

export default CustomSubscriptionHook;
