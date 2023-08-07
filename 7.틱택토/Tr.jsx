import React from "react";
import Td from "./Td";

const Tr = ({ td, rowIndex, dispatch }) => {
  return (
    <tr>
      {td.map((e, idx) => <Td key={`td${idx}`} value={e} cellIndex={idx} rowIndex={rowIndex} dispatch={dispatch} />)}
    </tr>
  )
}

export default Tr;