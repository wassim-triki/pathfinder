import { TCell } from '../types/types';

export const reconstructPath = (cameFrom: Map<TCell, TCell>, current: TCell): TCell[] => {
  const path: TCell[] = [];
  while (cameFrom.has(current)) {
    const newCurrent = cameFrom.get(current);
    if (newCurrent) {
      current = newCurrent;
      path.unshift(current);
    }
  }
  return path;
};
