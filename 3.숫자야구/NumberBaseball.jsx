import React, { Component } from "react";

function getNumbers() { // 겹치지 않는 숫자 4개를 랜덤하게 뽑는 함수
  const set = new Set([]);

  while (set.size < 4) {
    set.add(Math.ceil(Math.random() * 9));
  }

  console.log('[...set]', [...set]);
  return [...set];
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: []
  };

  onSubmitValue = (e) => {
    e.defaultPrevent();
  }

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
    console.log('getNumbers', getNumbers());
  }

  render() {
    return (
      <>
        <div>{this.state.result}</div>
        <form onSubmit={this.onSubmitValue}>
          <input type="text" value={this.state.value} onChange={this.onChangeInput} maxLength={4} />
          <button>입력</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          <li></li>
        </ul>
      </>
    )
  }
}

export default NumberBaseball;