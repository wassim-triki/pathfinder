import React, { FunctionComponent, useEffect, useState } from 'react';
import { astar } from '../astar';
import { useGridContext } from '../context/gridContext';
import { createGrid } from '../helpers/createGrid';
import { getLowestFCell } from '../helpers/getLowestFNode';
import { getNeighbors } from '../helpers/getNeighbors';
import { reconstructPath } from '../helpers/reconstructPath';
import { ICell } from '../interfaces/ICell';
import Cell from './Cell';

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: FunctionComponent<GridProps> = ({ rows, cols }) => {
  const { setGrid, grid } = useGridContext();
  const [path, setPath] = useState<ICell[]>([]);

  useEffect(() => {
    setGrid(createGrid(rows, cols));
  }, []);

  useEffect(() => {
    console.log(grid);
  }, [grid]);

  return (
    <div className='flex flex-col bg-red-300x col-span-4 '>
      {grid &&
        grid.map((row, i) => (
          <div key={i} className='flex'>
            {row.map((cell) => (
              <Cell key={cell.id} {...cell} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Grid;
