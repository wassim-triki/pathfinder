import { createContext, useContext, useState } from 'react';
import { ICell } from '../interfaces/ICell';

interface GridContextProps {
  grid: ICell[][];
  setGrid: any;
}

export const GridContext = createContext<GridContextProps>({ grid: [], setGrid: () => {} });

export const useGridContext = () => useContext(GridContext);
