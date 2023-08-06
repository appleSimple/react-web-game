import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RockScissorsPaper = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState('');

  const interval = useRef();

  // useLayoutEffect() // 레이아웃의 변화를 감지할 때 사용하는 것 (리사이징 같은 거)

  // useEffect : class의 lifeCycle을 비슷하게 따라하기 위해 존재한다.
  useEffect(() => { // componentDidMount, componentDidUpdate 역할
    interval.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current);
    } // componentWillUnmount 역할 
  }, [imgCoord]); // 클로저 문제를 해결해줄 것, imgCoord가 변화할 때마다 실행해주세요. 두번째 인수가 변경될때마다 componentDidMount 와 componentWillUnmount가 반복하여 실행된다.
  // [] 빈배열이면 처음에만 실행하는 것

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore((prev) => {
        return prev + 1
      })
    } else {
      setResult('졌습니다');
      setScore((prev) => {
        return prev - 1;
      })
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RockScissorsPaper;
