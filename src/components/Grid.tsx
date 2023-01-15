import React, { FunctionComponent } from 'react'
import Cell from './Cell'

interface GridProps {
  rows: number
  cols: number
}

const Grid: FunctionComponent<GridProps> = ({ rows, cols }) => {
  const grid: JSX.Element[][] = []
  for (let row = 0; row < rows; row++) {
    grid[row] = []
    for (let col = 0; col < cols; col++) {
      grid[row].push(<Cell row={row} col={col} />)
    }
  }
  console.log(grid)
  return (
    <div
      style={
        {
          // display: 'grid',
          // gridTemplateRows: `repeat(${rows},1fr)`,
          // gridTemplateColumns: `repeat(${cols},1fr)`,
          // width: '800px',
          // height: '800px',
        }
      }
      className='flex flex-col bg-red-300x col-span-4 '
    >
      {grid.map((row, i) => (
        <div key={i} className='flex'>
          {row.map((cell) => cell)}
        </div>
      ))}
    </div>
  )
}

export default Grid
