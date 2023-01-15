import { ICell } from '../interfaces/ICell';

export const getNeighbors = (cell: ICell, grid: ICell[][]): ICell[] => {
  const neighbors: ICell[] = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const { row, col } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < rows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < cols - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  if (row > 0 && col < cols - 1) neighbors.push(grid[row - 1][col + 1]);
  if (row < rows - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]);
  if (row < rows - 1 && col < cols - 1) neighbors.push(grid[row + 1][col + 1]);
  return neighbors;
};
