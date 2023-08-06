import React, { memo, useState } from "react";

// 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 강제로 리렌더링된다.
// 퓨어 컴포넌트는 state 변화일 때만 리렌더링되게 하는 기능도 있지만 props가 변화할 때만 리렌더링되게하는 기능도 있다.
// 퓨어 컴포넌트는 클래스 컴포넌트에서만 쓸 수 있다. 근데 함수 컴포넌트라면? memo를 이용하자

const Try = memo((props) => {
  // props는 자식 컴포넌트에서 변경하면 안된다.
  // props를 변경해야하는 경우에는 props를 state로 넣어준다. -> 부모의 state가 변경되기 때문에 의도치 않은 변경이 일어난다.
  // 클래스 컴포넌트를 사용하면 props를 더 정밀하게 사용할 수 있다. constructor에서 조작가능.
  const [element, setElement] = useState(props.el);

  return <li>{props.el}</li>;
});

Try.displayName = 'Try'; // memo같은 컴포넌트로 씌워버리면 개발자도구에서 이름이 변경되기 때문에 디스플레이 네임을 바꿔줌

export default Try;

// props를 많이 쓰면 렌더링이 자주 일어나서 성능이 안좋아질 수 있다.
// render 조건 -> props, state가 변화할 때.

