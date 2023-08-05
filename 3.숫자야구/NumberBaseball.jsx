import React, { Component } from "react";
import Try from "./Try";

function getNumbers() { // 겹치지 않는 숫자 4개를 랜덤하게 뽑는 함수
  const set = new Set([]);

  while (set.size < 4) {
    set.add(Math.ceil(Math.random() * 9).toString());
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
    e.preventDefault();

    let ball = 0;
    let strike = 0;

    this.state.value.split('').forEach((v, idx) => {
      if (this.state.answer.includes(v)) {
        console.log('ball', ball);
        console.log('strike', strike);
        ball += 1;
        if (this.state.answer[idx] === v) {
          strike += 1;
          ball -= 1;
        }
      }
    });

    if (strike === 4) {
      this.setState((prev) => {
        return {
          result: '정답',
          tries: [],
          value: '',
          answer: getNumbers(),
        }
      });
    }

    if (ball === 0 & strike === 0) {
      this.setState((prev) => {
        prev.tries.push(prev.value);
        return {
          result: 'nothing',
          tries: prev.tries,
          value: '',
          answer: this.state.answer,
        }
      });

      console.log(this.state);
      return;
    }

    this.setState((prev) => {
      prev.tries.push(prev.value);
      return {
        result: `${strike}스트라이크 ${ball}볼`,
        tries: prev.tries,
        value: '',
        answer: prev.answer,
      }
    });

    if (this.state.tries.length === 5) {
      this.setState(() => {
        return {
          result: '실패, 재시도!',
          tries: [],
          value: '',
          answer: getNumbers(),
        }
      });
    }
  }

  // Array.push는 배열에 새 요소 추가 후 배열의 길이를 반환한다...
  // Array.length는 빈문자열은 요소의 길이에 포함시키지 않는다는,,

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
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
          {this.state.tries.map((el, idx) => {
            return (
              <Try key={el+idx} el={el}></Try>
            )
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball;