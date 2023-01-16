import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createGrid } from '../helpers/createGrid';
import lodash from 'lodash';
import { TCell, TCellType, TGrid, TPosition } from '../types/types';
interface GridContextProps {
  grid: TGrid;
  startPosRef: React.MutableRefObject<TPosition> | null;
  targetPosRef: React.MutableRefObject<TPosition> | null;
  setGrid: React.Dispatch<React.SetStateAction<TGrid>>;
  resetGrid: () => void;
  updateNodeState: (state: TCellType, row: number, col: number) => void;
}
const initialState: GridContextProps = {
  grid: [],
  startPosRef: null,
  targetPosRef: null,
  setGrid: () => {},
  resetGrid: () => {},
  updateNodeState: (state, row, col) => {},
};

interface GridContextProviderProps {
  rows: number;
  cols: number;
  children: React.ReactNode;
}
const GridContext = createContext<GridContextProps>(initialState);

export const GridContextProvider = ({ rows, cols, children }: GridContextProviderProps) => {
  const [grid, setGrid] = useState(initialState.grid);
  const startPosRef = useRef<TPosition>({ row: 1, col: 1 });
  const targetPosRef = useRef<TPosition>({ row: 16, col: 32 });

  useEffect(() => {
    setGrid(createGrid(rows, cols, startPosRef.current, targetPosRef.current));
  }, []);

  useEffect(() => {
    console.log(startPosRef);
  }, [startPosRef]);

  const updateNodeState = (type: TCellType, row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.slice();
      newGrid[row][col].type = type;
      return newGrid;
    });
  };

  const resetGrid = () => {
    // setGrid(createGrid(rows, cols, { row: 1, col: 1 }, { row: 16, col: 32 }));
    // setStartNode(null);
  };

  return (
    <GridContext.Provider
      value={{
        updateNodeState,
        startPosRef,
        targetPosRef,
        resetGrid,
        grid,
        setGrid,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => useContext(GridContext);
