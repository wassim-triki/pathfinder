import { ICell } from '../interfaces/ICell';
import { manhattanDistance } from './manhattanDistance';

export const createGrid = (): ICell[][] => {
  const rows = 20;
  const cols = 37;
  const grid: ICell[][] = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      let isStart = row === 0 && col === 0;
      const isTarget = row === rows - 1 && col === cols - 1;
      const isWall = Math.random() < 0.1 && !isStart && !isTarget;
      const cell = {
        id: `${row}-${col}`,
        row,
        col,
        isStart,
        isTarget,
        isWall,
        visited: false,
        g: Infinity,
        h: isTarget ? 0 : manhattanDistance(row, col, rows - 1, cols - 1),
        f: Infinity,
      };
      grid[row].push(cell);
    }
  }
  return grid;
};