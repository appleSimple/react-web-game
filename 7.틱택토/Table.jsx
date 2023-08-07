import React from "react";
import Tr from "./Tr";

const Table = ({ table, dispatch }) => {
  return (
    <table className="table">
      <tbody>
        {table.map((e, idx) => <Tr key={`td${idx}`} td={e} rowIndex={idx} dispatch={dispatch} />)}
      </tbody>
    </table>
  )
}

export default Table;