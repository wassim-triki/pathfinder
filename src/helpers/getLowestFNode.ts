import { TCell } from '../types/types';

export const getLowestFCell = (openSet: Set<TCell>): TCell | undefined => {
  let lowestFCell: TCell | undefined;
  let lowestFValue = Infinity;
  for (const cell of openSet) {
    if (cell.f < lowestFValue) {
      lowestFValue = cell.f;
      lowestFCell = cell;
    }
  }
  return lowestFCell;
};
