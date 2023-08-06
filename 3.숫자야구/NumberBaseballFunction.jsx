import React, { useState, useRef } from "react";
import { Try } from "./Try";

// this를 안쓰면 class 객체 내부에 넣지 않는다 -> 다른 파일에서 사용할 수도 있으니까 !
function getNumbers() { // 겹치지 않는 숫자 4개를 랜덤하게 뽑는 함수
  const set = new Set([]);

  while (set.size < 4) {
    set.add(Math.ceil(Math.random() * 9).toString());
  }

  console.log('[...set]', [...set]);
  return [...set];
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  // 함수를 넣을 땐, 함수의 변수명만 넣자. 함수의 리턴 값이 answer로 들어가고 계속 함수를 호출하게됨. 왜냐면 함수형 컴포넌트는 setState가 일어날 때마다 전체가 실행되니까! -> lazy init 기법
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);

  onSubmitValue = (e) => {
    e.preventDefault();

    value.split('').forEach((v, idx) => {
      if (answer.includes(v)) {
        ball += 1;
        if (answer[idx] === v) {
          strike += 1;
          ball -= 1;
        }
      }
    });

    if (strike === 4) {
      setResult('정답');
      setAnswer(getNumbers());
      setTries([]);
      setValue('');
    }

    if (ball === 0 & strike === 0) {
      
      setTries((prev) => {
        const _tries = [...prev.tries, value];

        return _tries;
      });
      setValue('');
      setResult('nothing');

      return;
    }

    setTries((prev) => {
      const _tries = [...prev.tries, value];

      return _tries;
    });
    setValue('');
    setResult(`${strike}스트라이크 ${ball}볼`);

    if (tries.length === 5) {

      setResult('실패, 재시도!');
      setTries([]);
      setValue('');
      setAnswer(getNumbers());
    }
  }

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  }

  return (
    <>
      <div>{result}</div>
      <form onSubmit={onSubmitValue}>
        <input type="text" value={value} onChange={onChangeInput} maxLength={4} />
        <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((el, idx) => {
          return (
            <Try key={el+idx} el={el}></Try>
          )
        })}
      </ul>
    </>
  )
}

export default NumberBaseball;