import { getLowestFCell } from '../helpers/getLowestFNode';
import { getNeighbors } from '../helpers/getNeighbors';
import lodash from 'lodash';
import { useGridContext } from '../context/gridContext';
import { TCell, TGrid, TPosition } from '../types/types';
import { getCellFromPos } from '../helpers/getCellFromPos';
export const useAstar = () => {
  const { startPosRef, targetPosRef } = useGridContext();
  return (grid: TGrid) => {
    const newGrid = lodash.cloneDeep(grid);
    if (!startPosRef || !targetPosRef) return newGrid;
    const startPos: TPosition = startPosRef.current;
    const start = getCellFromPos(newGrid, startPos);
    start.g = 0;
    start.f = start.h;
    const openSet = new Set<TCell>();
    openSet.add(start);
    const cameFrom = new Map<TCell, TCell>();
    while (openSet.size > 0) {
      const current = getLowestFCell(openSet);
      if (!current) return newGrid;
      if (current.type === 'target') {
        break;
      }
      openSet.delete(current);
      current.visited = true;
      const neighbors = getNeighbors(current, newGrid);

      for (const neighbor of neighbors) {
        neighbor.isNeighbor = true;
        if (neighbor.visited || neighbor.type === 'wall') {
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
};
