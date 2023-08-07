import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumber() {
  const min = Math.ceil(1);
  const max = Math.floor(43);
  const set = new Set([]);

  while (set.size < 7) {
    set.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return [...set];
}

class Lotto extends Component {
  state = {
    numberList: getWinNumber(),
    winNumberList: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  componentDidMount() {
    this.setNumberList();
  }

  // 비동기 함수는 꼭 정리해주십시다,, memory 누수 문제를 방지합시다.
  componentWillUnmount() {
    this.timeouts.forEach((e) => clearTimeout(e));
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.numberList !== this.state.numberList) {
      this.setNumberList();
    }
  }

  setNumberList = () => {
    for (let i = 0; i < this.state.numberList.length - 1; i += 1) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prev) => {
          return {
            winNumberList: [...prev.winNumberList, this.state.numberList[i]],
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: this.state.numberList.slice(-1),
        redo: true,
      });
    }, 7000);
  };

  onClickRedo = () => {
    this.setState({
      numberList: getWinNumber(),
      winNumberList: [],
      bonus: null,
      redo: false,
    });

    this.timeouts = [];
  };

  render() {
    const { winNumberList, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winNumberList.map((number) => (
            <Ball key={number} number={number}></Ball>
          ))}
        </div>
        <div>보너스</div>
        {bonus && <Ball number={bonus[0]}></Ball>}
        {redo && <button onClick={this.onClickRedo}>한 번 더</button>}
      </>
    );
  }
}

export default Lotto;
