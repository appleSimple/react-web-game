import React, { useReducer, useRef, createContext, useMemo, useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MIEN: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0 // 0이상이면 다 오픈할 수 있도록 0으로 설정
}

// 함수라서 일단 실행한다. 그리고 초기값이 있으면 넣어주고, 여기서는 초기값이 따로 없으니 형태만 만들어준다.
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {}
});

const initialState = {
  tableData: [],
  time: 0,
  result: '',
};

export const actionType = {
  START_GAME: 'START_GAME',
  END_GAME: 'END_GAME'
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.START_GAME:
      const row = action.row;
      const column = action.column;
      const mines = action.mines;

      return {
        ...state,
        tableData: [...makeTable(row, column, mines)],
        result: '',
        time: 0
      }
    case actionType.END_GAME:
      console.log('end!');
      return {
        ...state,
        result: '꽝'
      }
    default:
      return state;
  }
};

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max); //최댓값은 제외, 최솟값은 포함
}

const makeTable = (row, column, mines) => {
  const table = [];
  const rowTable = [];

  for (let i = 0; i < row; i += 1) {
    rowTable.push(CODE.NORMAL);
  }
  for (let i = 0; i < column; i += 1) {
    table.push(rowTable);
  }

  let n = 0;
  const _table = [...table];
  
  while (n < mines) {
    const rowIndex = getRandomInt(row);
    const columnIndex = getRandomInt(column);
    
    if (table[rowIndex][columnIndex] === CODE.NORMAL) {
      _table[rowIndex] = [..._table[rowIndex]];
      _table[rowIndex][columnIndex] = CODE.MINE;
      n += 1;
    } else {
      n -= 1;
    }
  }

  return _table;
}

// ContextAPI를 사용 하면 아래에 있는 모든 컴포넌트에서 그 값들을 사용할 수 있다.
// 최적화하기 매우 어렵다. -> 성능저하가 일어날 수 있음
// 리렌더링 될 때마다 객체가 새로 생기고, 자식들에게도 매번 렌더링을 할 것이다. 그래서 캐싱을 해줘야함
const Boob = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, result } = state;
  const [time, setTime] = useState(0);
  const seconds = useRef(0);
  const value = useMemo(() => ({ tableData: tableData, dispatch: dispatch, result: state.result }), [state.tableData, state.result]); // 캐싱, dispatch는 캐시 안해줘도 됨. 변하지 않을 것임.

  const timer = () => {
    setInterval(() => {
      seconds.current += 1;
      console.log(seconds.current);
      if ((seconds.current - 60) > 0) {
        time = setTime(`${Math.floor((seconds.current - 60) / 60)}분 ${(seconds.current - 60) % 60}`);
      } else {
        time = setTime(seconds.current);
      }
    }, 1000);
  }

  useEffect(() => {
    if (tableData.length === 0) {
      return;
    }

  }, [state.tableData])

  return (
    <TableContext.Provider value={value}> {/* 해당 컨텍스트 프로바이더로 감싸준다. 넘겨줄 값들은 value에 넣는다. */}
      <Form />
      <div>time: {time}초</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default Boob;
