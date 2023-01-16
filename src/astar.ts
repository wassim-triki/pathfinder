import { getLowestFCell } from './helpers/getLowestFNode';
import { getNeighbors } from './helpers/getNeighbors';
import { reconstructPath } from './helpers/reconstructPath';
import { ICell } from './interfaces/ICell';
import lodash from 'lodash';
export const astar = (grid: ICell[][], startNode: ICell | null) => {
  const newGrid = lodash.cloneDeep(grid);
  if (!startNode) return newGrid;
  const start = startNode;
  start.g = 0;
  start.f = start.h;
  const openSet = new Set<ICell>();
  openSet.add(start);
  const cameFrom = new Map<ICell, ICell>();
  while (openSet.size > 0) {
    const current = getLowestFCell(openSet);
    if (!current) return newGrid;
    if (current.isTarget) {
      break;
    }
    openSet.delete(current);
    current.visited = true;
    const neighbors = getNeighbors(current, newGrid);

    for (const neighbor of neighbors) {
      neighbor.isNeighbor = !neighbor.isWall;
      if (neighbor.visited || neighbor.isWall) {
        continue;
      }
      const gScore = current.g + 1;
      if (gScore >= neighbor.g) {
        continue;
      }
      cameFrom.set(neighbor, current);
      neighbor.g = gScore;
      neighbor.f = neighbor.g + neighbor.h;
      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      }
    }
  }
  return newGrid;
};
