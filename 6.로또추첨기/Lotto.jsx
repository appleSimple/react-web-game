import React, { useRef, useEffect, useState, useMemo } from "react";
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

const Lotto = () => {
  // useMemo() : 함수 리턴 값을 기억함. 두번째 인자가 변경되며 재실행됨.
  // 이런 경우엔 useMemo를 쓸수도 있지만 useState(getWinNumber) 이렇게 호출하지 않고 이름만 넣어주는 것이 더 권장된다.
  // useCallback() : 함수 자체를 기억함. 자식 컴포넌트에게 props로 함수를 넘길 때는 꼭 사용해야 한다. 이게 없으면 매번 새로운 함수를 전달하기 때문에.. 자식 입장에서 props가 계속 변경된다고 인식해서 리렌더링이 계속 일어난다.
  const lottoNumbers = useMemo(() => getWinNumber(), []);
  const [numberList, setNumberList] = useState(lottoNumbers);
  const [winNumberList, setWinNumberList] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // componentDidUpdate 사이클만 사용하고 싶을 때. (componentDidMount를 뛰어넘음)
  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   }

  //   // function
  // }, [변경값])

  useEffect(() => {
    getNumberList();
    return () => {
      timeouts.current.forEach((e) => clearTimeout(e));
    }
  }, [numberList]);

  const getNumberList = () => {
    for (let i = 0; i < numberList.length - 1; i += 1) {
      timeouts.current[i] = setTimeout(() => {
        setWinNumberList((prev) => {
          return [...prev, numberList[i]]
        });
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(numberList.slice(-1));
      setRedo(true)
    }, 7000);
  };

  const onClickRedo = () => {
    setNumberList(getWinNumber);
    setWinNumberList([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  };

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
      {redo && <button onClick={onClickRedo}>한 번 더</button>}
    </>
  )
}

export default Lotto;
