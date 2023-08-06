import React, { PureComponent } from "react";

export default class RenderTest extends PureComponent {
  state = {
    counter: 0,
    array: []
  }

  // PureComponent로 변경하면 아래 효과를 자동으로 구현한다.
  // 구현 방식 :: state가 여러개 있으면 변경되었는지를 감지해서 렌더링의 유무를 선택한다. 그러나 객체같이 복잡한 구조의 state(참조방식)는 변경을 감지하기 어려워한다. 
  // 어떤 경우에만 다시 컴포넌트를 렌더링할 것인지 정의할 수 있다.
  // shouldComponentUpdate = (nextProps, nextState, nextContext) => {
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }

  //   return false;
  // }

  onClick = () => {
    // 새로운 배열로 만들지 않으면 퓨어컴포넌트가 차이를 알아차리지 못한다. 깊은 복사를 사용하자.
    const array = this.state.array;
    array.push(5);
    this.setState({
      array: [...this.state.array, array]
    });
  }

  render() {
    console.log('렌더링');
    return (
      <button onClick={this.onClick}>클릭</button>
    )
  }
}
