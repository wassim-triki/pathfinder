import { TGrid, TPosition } from '../types/types';
import { cellToInitialState } from './cellToInitialState';
import { manhattanDistance } from './manhattanDistance';

export const clearGrid = (grid: TGrid, startPos: TPosition, targetPos: TPosition): TGrid => {
  const newGrid = grid.map((row) =>
    row.map((cell) => cellToInitialState(cell, startPos, targetPos))
  );
  return newGrid;
};
