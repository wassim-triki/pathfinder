export type TCellType = 'initial' | 'start' | 'target' | 'wall';
export type TCell = {
  id: string;
  row: number;
  col: number;
  type: TCellType;
  visited: boolean;
  // isNeighbor?: boolean;
  g: number;
  h: number;
  f: number;
};

export type TRow = TCell[];
export type TGrid = TRow[];

export type TPosition = {
  row: number;
  col: number;
};
