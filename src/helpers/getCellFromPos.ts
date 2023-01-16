import { TCell, TGrid, TPosition } from '../types/types';
import lodash from 'lodash';

export const getCellFromPos = (grid: TGrid, cellPos: TPosition): TCell => {
  const flatGrid = lodash.flattenDeep(grid);
  const cell = flatGrid.find((c) => c.row === cellPos.row && c.col === cellPos.col);
  return cell || grid[0][0];
};
