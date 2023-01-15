import React, { FunctionComponent } from 'react'

interface CellProps {
  row: number
  col: number
}

const Cell: FunctionComponent<CellProps> = ({ row, col }: CellProps) => {
  return (
    <div
      key={`${row}-${col}`}
      className='border-[1px] border-light-100 w-8 h-8
'
    ></div>
  )
}

export default Cell
