// @flow

import React, { Component } from "react";
import * as d3 from "d3";

import style from "./d3learn.css";

type PropType = {};
type StateType = {
  data: number[],
  count: number
};

function ChartComponent({ data }: { data: number[] }) {
  return (
    <div className={style.chart}>
      {data.map((d, i) => (
        <div key={i} style={{ width: d + "%" }}>
          {d}
        </div>
      ))}
    </div>
  );
}

function ChartComponentD3({ data }: { data: number[] }) {
  return (
    <div
      className={style.chart}
      ref={element => {
        d3.select(element)
          .selectAll("div")
          .data(data)
          .enter()
          .append("div");

        d3.select(element)
          .selectAll("div")
          .data(data)
          .transition()
          .style("width", d => d + "%")
          .text(d => d);

        d3.select(element)
          .selectAll("div")
          .data(data)
          .exit()
          .remove();
      }}
    />
  );
}

function ChartComponentD3V2({ data }: { data: number[] }) {
  return (
    <div className={style.chart}>
      {data.map((d, i) => (
        <div
          key={i}
          ref={element =>
            d3
              .select(element)
              .transition()
              .style("width", d + "%")
          }
        >
          {d}
        </div>
      ))}
    </div>
  );
}

export default class D3Learn extends Component<PropType, StateType> {
  state = { data: [], count: 5 };
  d3LearnRef = React.createRef();

  componentDidMount() {
    this.randomizeData();
  }

  randomizeData() {
    this.setState(state => {
      const data = new Array(state.count)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
      return { data };
    });
  }

  reduceLength() {
    this.setState(
      ({ count }) => ({ count: count - 1 }),
      () => this.randomizeData()
    );
  }

  increaseLength() {
    this.setState(
      ({ count }) => ({ count: count + 1 }),
      () => this.randomizeData()
    );
  }

  render() {
    return (
      <div style={{ padding: "1em 0" }}>
        <div style={{ margin: "1em 0" }}>
          <button
            className="btn btn-primary"
            onClick={() => this.randomizeData()}
          >
            Randomize
          </button>{" "}
          <button
            className="btn btn-secondary"
            onClick={() => this.reduceLength()}
          >
            Reduce Length
          </button>{" "}
          <button
            className="btn btn-secondary"
            onClick={() => this.increaseLength()}
          >
            Increase Length
          </button>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">React Chart</div>
              <ChartComponent data={this.state.data} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">D3 Chart</div>
              <ChartComponentD3 data={this.state.data} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">React + D3 Chart</div>
              <ChartComponentD3V2 data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
