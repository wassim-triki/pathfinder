import React, { FunctionComponent } from 'react';
import { ICell } from '../interfaces/Cell';
import Cell from './Cell';

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: FunctionComponent<GridProps> = ({ rows, cols }) => {
  const grid: ICell[][] = [];

  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = {
        id: `${row}-${col}`,
        row,
        col,
        isStart: row === 0 && col === 0,
        isTarget: row === rows - 1 && col === cols - 1,
        isWall: Math.random() < 0.01,
      };
      grid[row].push(cell);
    }
  }
  console.log(grid);
  return (
    <div className='flex flex-col bg-red-300x col-span-4 '>
      {grid.map((row, i) => (
        <div key={i} className='flex'>
          {row.map((cell) => (
            <Cell {...cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
