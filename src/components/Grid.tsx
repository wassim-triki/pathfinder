import { update } from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useGridContext } from '../context/gridContext';
import { createGrid } from '../helpers/createGrid';
import { getLowestFCell } from '../helpers/getLowestFNode';
import { getNeighbors } from '../helpers/getNeighbors';
import { reconstructPath } from '../helpers/reconstructPath';
import { TCell, TCellType } from '../types/types';
import Cell from './Cell';

interface GridProps {
  // rows: number;
  // cols: number;
}

const Grid: FunctionComponent<GridProps> = () => {
  const { grid, updateNodeState, startPosRef, targetPosRef } = useGridContext();

  const mousePressedType = useRef<TCellType | false>(false);
  const handleMouseDown = useCallback(
    (e: any, row: number, col: number, type: TCellType) => {
      // Prevent element drag
      e.preventDefault();

      // Left click
      if (e.buttons === 1) {
        // Drag start or target nodes
        if (type === 'start' || type === 'target') {
          mousePressedType.current = type;
        }
      }
    },
    [updateNodeState]
  );

  const handleMouseUp = useCallback(() => {
    mousePressedType.current = false;
  }, []);

  const handleMouseEnter = useCallback(
    (row: number, col: number, type: TCellType) => {
      if (mousePressedType.current === 'start' || mousePressedType.current === 'target') {
        updateNodeState(mousePressedType.current, row, col);

        // Set the new positions of "start" or "target" nodes
        if (startPosRef && targetPosRef)
          mousePressedType.current === 'start'
            ? (startPosRef.current = { row, col })
            : (targetPosRef.current = { row, col });
      }
    },
    [update]
  );

  const handleMouseLeave = useCallback(
    (row: number, col: number) => {
      // Start or target are beind dragged out of this node
      if (mousePressedType.current === 'start' || mousePressedType.current === 'target') {
        updateNodeState('initial', row, col);
      }
    },
    [updateNodeState]
  );

  const handleClick = useCallback((cell: TCell) => {
    console.log(cell);
  }, []);

  return (
    <div onDragOver={(e) => e.preventDefault()} className='flex flex-col bg-red-300x col-span-4 '>
      {grid &&
        grid.map((row, i) => (
          <div key={i} className='flex'>
            {row.map((cell) => (
              <Cell
                key={cell.id}
                cell={cell}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Grid;
