import React, { Component, createRef } from "react";
import Try from "./Try";

// this를 안쓰면 class 객체 내부에 넣지 않는다 -> 다른 파일에서 사용할 수도 있으니까 !
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

      this.inputRef.current.focus();
    }

    if (ball === 0 & strike === 0) {
      this.setState((prev) => {
        // push 쓰지 말자,, 예전 state와 현재 state가 달라야 렌더링이 된다.
        // 여튼 얕은 복사로 ㄴㄴ 깊은 복사 후 사용합시다. 뭐 그런 것.
        const _tries = [...prev.tries, prev.value];
        return {
          result: 'nothing',
          tries: _tries,
          value: '',
          answer: this.state.answer,
        }
      });

      this.inputRef.current.focus();
      return;
    }

    this.setState((prev) => {
      const _tries = [...prev.tries, prev.value];
      this.inputRef.current.focus();

      return {
        result: `${strike}스트라이크 ${ball}볼`,
        tries: _tries,
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
      this.inputRef.current.focus();
    }
  }

  // Array.push는 배열에 새 요소 추가 후 배열의 길이를 반환한다...
  // Array.length는 빈문자열은 요소의 길이에 포함시키지 않는다는,,

  // 화살표로 하면 this 사용 가능, 그냥 함수 쓰면 this 사용 불가
  // 화살표 함수가 constructor의 bind(this)를 알아서 해줌
  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  }

  // class 컴포넌트에서 useRef대신 사용할 수 있다.
  // 함수를 사용하면 더 미세하게 조작할 수 있다는 장점이 있음
  inputRef = createRef();

  // bind(this)는 extends에서 알아서 해줌
  render() {
    return (
      <>
        <div>{this.state.result}</div>
        <form onSubmit={this.onSubmitValue}>
          <input ref={this.inputRef} type="text" value={this.state.value} onChange={this.onChangeInput} maxLength={4} />
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