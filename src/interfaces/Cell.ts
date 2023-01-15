export interface ICell {
  id: string;
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
}
