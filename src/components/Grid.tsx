import { update } from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useGridContext } from '../context/gridContext';
import { createGrid } from '../helpers/createGrid';
import { getLowestFCell } from '../helpers/getLowestFNode';
import { getNeighbors } from '../helpers/getNeighbors';
import { reconstructPath } from '../helpers/reconstructPath';
import { TCell, TCellType } from '../types/types';
import Cell from './Cell';

const Grid: FunctionComponent = () => {
  const { grid, updateNodeState, startPosRef, targetPosRef } = useGridContext();

  const draggedCellType = useRef<TCellType | false>(false);
  const mouseOverCellType = useRef<TCellType>('initial');
  const handleMouseDown = useCallback(
    (e: any, row: number, col: number, type: TCellType) => {
      // Prevent element drag
      e.preventDefault();

      // Left click
      if (e.buttons === 1) {
        // Drag start or target nodes
        if (type === 'start' || type === 'target') {
          draggedCellType.current = type;
        }
        if (type !== 'start' && type !== 'target') {
          draggedCellType.current = 'wall';
          updateNodeState(draggedCellType.current, row, col);
        }
        if (type === 'wall') {
          updateNodeState('initial', row, col);
        }
      }
    },
    [updateNodeState]
  );

  const handleMouseUp = useCallback((e: any) => {
    if (e.buttons === 0) {
      draggedCellType.current = false;
      mouseOverCellType.current = 'initial';
    }
  }, []);

  const handleMouseEnter = useCallback(
    (row: number, col: number, type: TCellType) => {
      if (type === 'start' || type === 'target') return;
      if (draggedCellType.current === 'start' || draggedCellType.current === 'target') {
        mouseOverCellType.current = type;
        updateNodeState(draggedCellType.current, row, col);

        // Set the new positions of "start" or "target" nodes
        if (startPosRef && targetPosRef)
          draggedCellType.current === 'start'
            ? (startPosRef.current = { row, col })
            : (targetPosRef.current = { row, col });
      }
      if (draggedCellType.current === 'wall') {
        console.log(draggedCellType.current);
        updateNodeState('wall', row, col);
      }
    },
    [updateNodeState]
  );

  const handleMouseLeave = useCallback(
    (row: number, col: number, type: TCellType) => {
      // Start or target are beind dragged out of this node
      if (draggedCellType.current === 'start' || draggedCellType.current === 'target') {
        updateNodeState(mouseOverCellType.current, row, col);
      }
    },
    [updateNodeState]
  );

  const handleClick = useCallback((cell: TCell) => {
    // console.log(cell);
  }, []);

  return (
    <div className='flex flex-col bg-red-300x col-span-4 '>
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
