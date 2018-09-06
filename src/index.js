// @flow
/* eslint-disable no-console */

import React from "react";
import ReactDOM from "react-dom";

import "./webGLtest";

class MyThing extends React.Component<{}> {
  render(): global.JSX.Element {
    return <p>Hello World!</p>;
  }
}

console.log("hello world");

type TestType = {
  x: number,
  y: number
};

function doSomeMath(n: number): number {
  if (n === 0 || n === 1) {
    const value = 1;
    return value;
  } else {
    return doSomeMath(n - 1) * n;
  }
}

function doStuff(test: TestType) {
  console.log(test.x, test.y);
}

doStuff({ x: 2, y: 5, z: 12 });

const answer = doSomeMath(5);

console.log("Answer:", answer);

let rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.render(
    <div>
      <MyThing />
      <p>Testing Loader</p>
    </div>,
    rootElement
  );
}
