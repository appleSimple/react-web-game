import React, { memo } from "react";
import { actionType } from './TikTakTo';

const Td = memo(({ value, rowIndex, cellIndex, dispatch }) => {
  const onClickTd = () => {
    dispatch({ type: actionType.CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸 클릭 후 
  };

  return (
    <td onClick={value === '' ? onClickTd : null}>{value}</td>
  )
})

export default Td;