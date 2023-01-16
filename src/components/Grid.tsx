import React, { FunctionComponent, useEffect, useState } from 'react';
import { useGridContext } from '../context/gridContext';
import { createGrid } from '../helpers/createGrid';
import { getLowestFCell } from '../helpers/getLowestFNode';
import { getNeighbors } from '../helpers/getNeighbors';
import { reconstructPath } from '../helpers/reconstructPath';
import { ICell } from '../interfaces/ICell';
import Cell from './Cell';

interface GridProps {
  // rows: number;
  // cols: number;
}

const Grid: FunctionComponent<GridProps> = () => {
  const { grid } = useGridContext();

  return (
    <div onDragOver={(e) => e.preventDefault()} className='flex flex-col bg-red-300x col-span-4 '>
      {grid &&
        grid.map((row, i) => (
          <div key={i} className='flex'>
            {row.map((cell) => (
              <Cell key={cell.id} cell={cell} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Grid;
