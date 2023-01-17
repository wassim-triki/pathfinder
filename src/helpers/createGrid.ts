import { manhattanDistance } from './manhattanDistance';
import {
  START_NODE_ROW,
  START_NODE_COL,
  TARGET_NODE_ROW,
  TARGET_NODE_COL,
} from '../constants/constances';
import { TCell, TGrid, TPosition, TRow } from '../types/types';
export const createGrid = (
  rows: number,
  cols: number,
  startPos: TPosition,
  targetPos: TPosition
): TCell[][] => {
  const grid: TGrid = [];
  for (let i = 0; i < rows; i++) {
    const row: TRow = [];
    for (let j = 0; j < cols; j++) {
      const type =
        i === startPos.row && j === startPos.col
          ? 'start'
          : i === targetPos.row && j === targetPos.col
          ? 'target'
          : 'initial';

      const cell: TCell = {
        id: `${i}-${j}`,
        row: i,
        col: j,
        type,
        visited: false,
        g: Infinity,
        h: type === 'target' ? 0 : manhattanDistance(i, j, targetPos.row, targetPos.col),
        f: Infinity,
      };
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
};
