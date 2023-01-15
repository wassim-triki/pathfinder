import { ICell } from '../interfaces/ICell';

export const getLowestFCell = (openSet: Set<ICell>): ICell | undefined => {
  let lowestFCell: ICell | undefined;
  let lowestFValue = Infinity;
  for (const cell of openSet) {
    if (cell.f < lowestFValue) {
      lowestFValue = cell.f;
      lowestFCell = cell;
    }
  }
  return lowestFCell;
};
