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
  const mouseOverCellType = useRef<TCellType | false>(false);

  const dragged = useRef<TCellType | null>(null);
  const entered = useRef<TCellType | null>(null);
  const left = useRef<TCellType | null>(null);
  const over = useRef<TCellType | null>(null);

  useEffect(() => {
    // console.log(over.current);
  }, [over.current]);

  const handleMouseDown = useCallback(
    (e: any, row: number, col: number, type: TCellType) => {
      // Prevent element drag
      e.preventDefault();

      // Left click
      if (e.buttons === 1) {
        // Drag start or target nodes
        if (type === 'start' || type === 'target') {
          dragged.current = type;
        }
        if (type === 'initial') {
          dragged.current = 'wall';
          updateNodeState('wall', row, col);
        }
        if (type === 'wall') {
          dragged.current = 'initial';
          updateNodeState('initial', row, col);
        }
      }
    },
    [updateNodeState]
  );

  const handleMouseUp = useCallback((e: any) => {
    if (e.buttons === 0) {
      dragged.current = null;
      over.current = null;
      entered.current = null;
      left.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (row: number, col: number, type: TCellType) => {
      entered.current = type;
      over.current = type;
      if (!dragged.current || type === 'start' || type === 'target') return;
      if (dragged.current === 'start' || dragged.current === 'target') {
        updateNodeState(dragged.current, row, col);
        if (targetPosRef && startPosRef)
          dragged.current === 'start'
            ? (startPosRef.current = { row, col })
            : (targetPosRef.current = { row, col });
      }
      if (dragged.current === 'wall') updateNodeState('wall', row, col);
      if (dragged.current === 'initial') updateNodeState('initial', row, col);
      // if (draggedCellType.current === 'start' || draggedCellType.current === 'target') {
      //   if (type === 'start' || type === 'target') {
      //   }
      //   updateNodeState(draggedCellType.current, row, col);

      //   // Set the new positions of "start" or "target" nodes
      //   if (startPosRef && targetPosRef)
      //     draggedCellType.current === 'start'
      //       ? (startPosRef.current = { row, col })
      //       : (targetPosRef.current = { row, col });
      // }
      // if (draggedCellType.current === 'wall' || draggedCellType.current === 'initial') {
      //   updateNodeState(draggedCellType.current, row, col);
      // }
    },
    [updateNodeState]
  );

  const handleMouseLeave = useCallback(
    (row: number, col: number, type: TCellType) => {
      left.current = type;

      if (
        over.current === dragged.current &&
        (dragged.current === 'start' || dragged.current === 'target')
      ) {
        updateNodeState('initial', row, col);
      }

      if (dragged.current === 'start' || dragged.current === 'target') {
        if (over.current && over.current !== 'target' && over.current !== 'start')
          updateNodeState(over.current, row, col);
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
