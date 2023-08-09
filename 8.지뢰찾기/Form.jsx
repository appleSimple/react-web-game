import React, { useCallback, useContext, useRef, useState } from "react";
import { actionType, TableContext } from "./Boob";

const Form = () => {
  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');
  const [mines, setMines] = useState('');
  const { tableData, dispatch } = useContext(TableContext); // 사용할 컨텍스트를 임포트하여 가져온다.

  const onChangeRowInput = useCallback((e) => {
    setRow(e.target.value);
  }, [])

  const onChangeColumnInput = useCallback((e) => {
    setColumn(e.target.value);
  }, [])

  const onChangeMinesInput = useCallback((e) => {
    setMines(e.target.value);
  }, [])

  const onStartGame = useCallback(() => {
    dispatch({ type: actionType.START_GAME, row: row, column: column, mines: mines });
  }, [row, column, mines]);
  
  return (
    <form>
      <input type="number" placeholder="가로" value={row} onChange={(e) => onChangeRowInput(e)} />
      <input type="number" placeholder="세로" value={column} onChange={(e) => onChangeColumnInput(e)} />
      <input type="number" placeholder="지뢰" value={mines} onChange={(e) => onChangeMinesInput(e)} />
      <button type="button" onClick={onStartGame}>시작</button>
    </form>
  )
}

export default Form;