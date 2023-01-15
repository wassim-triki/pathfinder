import React, { FunctionComponent } from 'react';
import { ICell } from '../interfaces/Cell';

interface CellProps extends ICell {}

const Cell: FunctionComponent<CellProps> = ({
  row,
  col,
  id,
  isStart,
  isTarget,
  isWall,
}: CellProps) => {
  return (
    <div
      key={`${row}-${col}`}
      className={`border-[1px] bg-{} border-light-100 w-8 h-8 cursor-pointer ${
        !isStart && !isTarget && !isWall && 'hover:bg-light-100'
      }  active:transform active:scale-105 active:bg-white transition-transform active:border-white ${
        isStart && 'bg-green-400'
      } ${isTarget && 'bg-red-400'} ${isWall && 'bg-white'}`}
    ></div>
  );
};

export default Cell;
