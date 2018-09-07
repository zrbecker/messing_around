// @flow
/* eslint-disable no-console */

import React from "react";
import ReactDOM from "react-dom";

import LazyParent from "./components/lazyParent";
import Parent from "./components/parent";
import MountingApp from "./mounting/mounting-app";

import "./components/test.mystyle";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

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
    <div className="text-center">
      <div className="jumbotron">
        <h1>Messing Around</h1>
      </div>
      <div className="container">
        <MountingApp />
        <hr />
        <MyThing />
        <hr />
        <LazyParent />
        <hr />
        <p>Testing Loader</p>
        <hr />
        <Parent />
      </div>
    </div>,
    rootElement
  );
}
