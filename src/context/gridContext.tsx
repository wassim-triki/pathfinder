import React, { createContext, useContext, useEffect, useState } from 'react';
import { createGrid } from '../helpers/createGrid';
import { ICell } from '../interfaces/ICell';
import lodash from 'lodash';
interface GridContextProps {
  grid: ICell[][];
  setGrid: React.Dispatch<React.SetStateAction<ICell[][]>>;
  startNode: ICell | null;
  setStartNode: React.Dispatch<React.SetStateAction<ICell | null>>;
}
const initialState: GridContextProps = {
  grid: [],
  setGrid: () => {},
  startNode: null,
  setStartNode: () => {},
};

interface GridContextProviderProps {
  children: React.ReactNode;
}
const GridContext = createContext<GridContextProps>(initialState);

export const GridContextProvider = ({ children }: GridContextProviderProps) => {
  const [grid, setGrid] = useState(initialState.grid);
  const [startNode, setStartNode] = useState(initialState.startNode);

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  return (
    <GridContext.Provider value={{ grid, setGrid, startNode, setStartNode }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => useContext(GridContext);
