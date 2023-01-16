import React, { FunctionComponent, useEffect, useState } from 'react';
import { ICell } from '../interfaces/ICell';

interface CellProps {
  cell: ICell;
}

const Cell: FunctionComponent<CellProps> = ({ cell }: CellProps) => {
  const { isStart, isTarget, isWall, isNeighbor, visited } = cell;

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
    if (!cell.isTarget && !cell.isStart) cell.isWall = !cell.isWall;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`border-[1px] bg-{} border-light-100 w-8 h-8 cursor-pointer ${
        !isStart && !isTarget && !isWall && 'hover:bg-light-100'
      }  active:border-white 
      ${visited && !isStart && !isTarget && 'bg-blue-400 animate-scale '}
      ${isNeighbor && !visited && !isTarget && 'bg-blue-200'}
      ${isWall && 'bg-white animate-scale '}
      ${isTarget && 'bg-red-400'}
      ${isStart && 'bg-green-400'}  
      `}
    ></div>
  );
};

export default Cell;
