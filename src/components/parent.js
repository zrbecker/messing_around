import React from "react";
import Child from "./child";

export default function Parent() {
  return (
    <div>
      <div className="mybox">My Box 1</div>
      <Child />
    </div>
  );
}
