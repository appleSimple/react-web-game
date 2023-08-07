import React, {memo} from "react";
import Td from "./Td";

const Tr = memo(({ td, rowIndex, dispatch }) => {
  return (
    <tr>
      {td.map((e, idx) => <Td key={`td${idx}`} value={e} cellIndex={idx} rowIndex={rowIndex} dispatch={dispatch} />)}
    </tr>
  )
})

export default Tr;