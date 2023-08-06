import React, { useRef, useState } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  // useRef의 값이 바뀔 때는, state처럼 리렌더링이 일어나지 않는다.
  const timeout = useRef();
  const startTime = useRef();
  const endTime = useRef();
  
  const onClickScreen = () => {
    if (state === "waiting") {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');

      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭하세요');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하세요, 초록색이 되면 클릭하세요.');
    } else if (state === "now") {
      endTime.current = new Date();

      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prev) => {
        return [...prev, endTime.current - startTime.current];
      })
    }
  }

  const getAverage = () => {
    return result.length === 0
    ? null
    : (
      <div>
        평균 시간:{" "}
        {result.reduce((a, c) => a + c) / result.length}ms
        <button onClick={resetAverage}>리셋</button>
      </div>
    );
  };

  const resetAverage = () => {
    setResult([]);
  };

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {getAverage()}
    </>
  );
};

export default ResponseCheck;
