import React, { Component } from "react";

class ResponseCheckClass extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;

    if (state === "waiting") {
      console.log("asdf");
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });

      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭하세요",
        }); // 2-3초 랜덤
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "너무 성급하세요, 초록색이 되면 클릭하세요.",
      });
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState((prev) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요.",
          result: [...prev.result, this.endTime - this.startTime],
        };
      });
    }
  };

  getAverage = () => {
    return this.state.result.length === 0 ? null : (
      <div>
        평균 시간:{" "}
        {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms
        <button onClick={this.resetAverage}>리셋</button>
      </div>
    );
  };

  resetAverage = () => {
    this.setState({
      result: [],
    });
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.getAverage()}
      </>
    );
  }
}

export default ResponseCheckClass;
