import { TCell, TPosition } from '../types/types';
import { manhattanDistance } from './manhattanDistance';

export const cellToInitialState = (cell: TCell, startPos: TPosition, targetPos: TPosition) => ({
  ...cell,
  type: cell.type === 'visited' || cell.type === 'neighbor' ? 'initial' : cell.type,
  g: Infinity,
  h:
    cell.type === 'target' ? 0 : manhattanDistance(cell.row, cell.col, startPos.row, targetPos.col),
  f: Infinity,
});
