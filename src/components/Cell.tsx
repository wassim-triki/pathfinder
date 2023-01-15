import React, { FunctionComponent, useEffect } from 'react';
import { ICell } from '../interfaces/ICell';

interface CellProps extends ICell {}

const Cell: FunctionComponent<CellProps> = ({
  row,
  col,
  id,
  isStart,
  isTarget,
  isWall,
  isNeighbor,
  visited,
}: CellProps) => {
  useEffect(() => {}, []);
  return (
    <div
      key={`${row}-${col}`}
      className={`border-[1px] bg-{} border-light-100 w-8 h-8 cursor-pointer ${
        !isStart && !isTarget && !isWall && 'hover:bg-light-100'
      }  active:transform active:scale-105 active:bg-white transition-transform active:border-white 
      ${visited && !isStart && !isTarget && 'bg-blue-400'}
      ${isNeighbor && !visited && !isTarget && 'bg-blue-200'}
      ${(isWall && isNeighbor) || isWall ? 'bg-white' : ''}
      ${isTarget && 'bg-red-400'}
      ${isStart && 'bg-green-400'}  
      `}
    ></div>
  );
};
// ${isNeighbor && 'bg-accent-50'}

export default Cell;
