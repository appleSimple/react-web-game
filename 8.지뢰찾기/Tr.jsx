import React, {memo} from "react";
import Td from "./Td";

const Tr = memo(({ rowIndex, row }) => {
  return (
    <tr>
      {row.map((e, idx) => <Td key={`row-${rowIndex}-cell-${idx}`} rowIndex={rowIndex} cellIndex={idx}></Td>)}
    </tr>
  )
})

Tr.displayName = 'Tr';

export default Tr;