export interface ICell {
  id: string;
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
  visited: boolean;
  isNeighbor?: boolean;
  g: number;
  h: number;
  f: number;
}
