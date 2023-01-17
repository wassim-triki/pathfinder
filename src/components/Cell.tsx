import React, {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGridContext } from '../context/gridContext';
import { TCell } from '../types/types';

interface CellProps {
  cell: TCell;
  onMouseDown: Function;
  onMouseUp: MouseEventHandler;
  onMouseEnter: Function;
  onMouseLeave: Function;
  onClick: Function;
}

const Cell: FunctionComponent<CellProps> = React.memo(
  ({ cell, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, onClick }: CellProps) => {
    const { type, visited, row, col, isNeighbor } = cell;

    return (
      <div
        onClick={(e) => onClick(cell)}
        onMouseDown={(e) => onMouseDown(e, row, col, type)}
        onMouseUp={onMouseUp}
        onMouseEnter={(e) => onMouseEnter(row, col, type)}
        onMouseLeave={(e) => onMouseLeave(row, col)}
        className={`text-xs text-white flex justify-center items-center border-[1px] bg-{} border-light-100 w-8 h-8 cursor-pointer ${
          type === 'initial' && 'hover:bg-light-100'
        }  active:border-white 
        ${
          isNeighbor &&
          !(type === 'start') &&
          !(type === 'target') &&
          !visited &&
          'bg-yellow-100 animate-scale '
        }
      ${visited && 'bg-yellow-400 animate-scale '}
      ${type === 'wall' && 'bg-white animate-scale '}
      ${type === 'target' && 'bg-red-400'}
      ${type === 'start' && 'bg-green-400'}  
      `}
      >
        {Number.isFinite(cell.h) && cell.h.toFixed(1)}
        <br />
        {Number.isFinite(cell.g) && cell.g.toFixed(1)}
      </div>
    );
  }
);

export default Cell;
