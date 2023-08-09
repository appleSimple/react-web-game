import React, { memo, useContext } from "react";
import Tr from './Tr';
import { TableContext } from "./Boob";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {tableData.map((e, idx) => <Tr key={`row-${idx}`} rowIndex={idx} row={e}></Tr>)}
      </tbody>
    </table>
  )
})

Table.displayName = 'Table';

export default Table;