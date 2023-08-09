import React, {memo, useCallback, useContext, useState} from "react";
import { actionType, TableContext } from "./Boob";

const Td = memo(({rowIndex, cellIndex}) => {
  const { tableData, dispatch, result } = useContext(TableContext);
  const [clicked, setClicked] = useState(false);

  const onClickCell = useCallback((e) => {
    const clikedCell = tableData[rowIndex][cellIndex];
    setClicked(true);
    if (clikedCell === -7) {
      dispatch({ type: actionType.END_GAME });
      e.target.style.backgroundColor = 'red';
      e.target.style.color = 'white';
    }
  }, [tableData]);

  return (
    <td onClick={result === '꽝' ? () => {} : (e) => onClickCell(e)} >{(clicked || result === '꽝') && tableData[rowIndex][cellIndex]}</td>
  )
})

Td.displayName = 'Td';

export default Td;