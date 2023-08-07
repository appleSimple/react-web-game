import React, { useCallback, useEffect, useReducer } from "react";
import Table from "./Table";

// actionType은 상수형태로 생성하기
export const actionType = {
  SET_WINNER: 'SET_WINNER',
  CLICK_CELL: 'CLICK_CELL',
  CHANGE_TURN: 'CHANGE_TURN',
  RESET_GAME: 'RESET_GAME'
}

// 이 컴포넌트에서 Td까지 데이터를 전달해줘야 함..
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']],
  recentCell: [-1, -1]
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_WINNER:
      // state.winner = action.winner : 이렇게 직접 변경하면 안된다.
      return {
        ...state,
        winner: action.winner
      }
    case actionType.CLICK_CELL:
      const tableData = [...state.tableData]; // 새로운 객체로 만들어주세요.
      tableData[action.row] = [...tableData[action.row]]; // immer 라이브러리로 가독성 해결 가능
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      }
    case actionType.CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    case actionType.RESET_GAME:
      console.log('reset');
      return {
        ...state,
        turn: 'O',
        tableData: [['', '', ''], ['', '', ''], ['', '', '']],
        recentCell: [-1, -1]
      }
  }
}
const TikTackTo = () => {
  // dispatch는 비동기다.
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, turn, recentCell } = state;

  useEffect(() => {
    const [row, cell] = recentCell;

    if (row < 0) { // -1, -1일 때, 최초 진입시 실행하지 않는다.
      return;
    }

    let win = false;

    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if (win) { // 승리시
      dispatch({ type: actionType.SET_WINNER, winner: turn });
      dispatch({ type: actionType.RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });

      if (all) {
        dispatch({ type: actionType.SET_WINNER, winner: null });
        dispatch({ type: actionType.RESET_GAME });
      } else {
        dispatch({ type: actionType.CHANGE_TURN });
      }
    }
  }, [recentCell]);

  // const [result, setResult] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  // 컴포넌트에 넣는 함수는 useCallback 사용하기
  const onClickTable = useCallback(() => {
    // dispatch 안에는 action 객체가 들어간다. action 안에 type
    // dispatch한다. -> 액션을 실행한다. -> 액션을 해석해서 state를 변경하기 위해서는 reducer를 동작시켜야한다.
    // 액션할 때마다 reducer가 실행된다.
    // state가 많을 때, 한번에 액션을 할 수 있다.
    dispatch({ type: actionType.SET_WINNER, winner: 'O' });
  });

  return (
    <>
      <Table table={state.tableData} onClick={onClickTable} dispatch={dispatch} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  )
}

export default TikTackTo;

// useReducer() Redux의 핵심 부분을 가져옴
// 규모가 작은 프로젝트에서는 useReducer과 ContextAPI로 Redux를 흉내낼 수 있다.