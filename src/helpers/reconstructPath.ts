import { ICell } from '../interfaces/ICell';

export const reconstructPath = (cameFrom: Map<ICell, ICell>, current: ICell): ICell[] => {
  const path: ICell[] = [];
  while (cameFrom.has(current)) {
    const newCurrent = cameFrom.get(current);
    if (newCurrent) {
      current = newCurrent;
      path.unshift(current);
    }
  }
  return path;
};
