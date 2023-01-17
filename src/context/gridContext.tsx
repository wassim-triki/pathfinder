import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createGrid } from '../helpers/createGrid';
import lodash from 'lodash';
import { TCell, TCellType, TGrid, TPosition } from '../types/types';
import { manhattanDistance } from '../helpers/manhattanDistance';
import {
  START_NODE_COL,
  START_NODE_ROW,
  TARGET_NODE_COL,
  TARGET_NODE_ROW,
} from '../constants/constances';
import { useAstar } from '../hooks/useAstar';
interface GridContextProps {
  grid: TGrid;
  startPosRef: React.MutableRefObject<TPosition> | null;
  targetPosRef: React.MutableRefObject<TPosition> | null;
  setGrid: React.Dispatch<React.SetStateAction<TGrid>>;
  resetGrid: () => void;
  updateNodeState: (state: TCellType, row: number, col: number) => void;
  clearPath: () => void;
  startSearch: () => void;
}
const initialState: GridContextProps = {
  grid: [],
  startPosRef: null,
  targetPosRef: null,
  setGrid: () => {},
  resetGrid: () => {},
  updateNodeState: (state, row, col) => {},
  clearPath: () => {},
  startSearch: () => {},
};

interface GridContextProviderProps {
  rows: number;
  cols: number;
  children: React.ReactNode;
}
const GridContext = createContext<GridContextProps>(initialState);

export const GridContextProvider = ({ rows, cols, children }: GridContextProviderProps) => {
  const [grid, setGrid] = useState(initialState.grid);
  const startPosRef = useRef<TPosition>({ row: START_NODE_ROW, col: START_NODE_COL });
  const targetPosRef = useRef<TPosition>({ row: TARGET_NODE_ROW, col: TARGET_NODE_COL });

  const astar = useAstar();

  useEffect(() => {
    setGrid(createGrid(rows, cols, startPosRef.current, targetPosRef.current));
  }, []);

  useEffect(() => {
    if (grid.length) {
      const newGrid = grid.slice();
      newGrid.forEach((row) => {
        row.forEach((cell) => {
          cell.h =
            cell.type === 'target'
              ? 0
              : manhattanDistance(
                  cell.row,
                  cell.col,
                  targetPosRef.current.row,
                  targetPosRef.current.col
                );
          cell.f = cell.g + cell.h;
        });
      });
      setGrid(newGrid);
    }
  }, [startPosRef.current, targetPosRef.current]);

  const updateNodeState = (type: TCellType, row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.slice();
      newGrid[row][col].type = type;
      return newGrid;
    });
  };

  useEffect(() => {
    console.log(targetPosRef);
  }, [targetPosRef.current]);

  const clearPath = () => {
    setGrid(createGrid(rows, cols, startPosRef.current, targetPosRef.current));
  };
  const startSearch = () => {
    setGrid((prev) => {
      const newGrid = createGrid(rows, cols, startPosRef.current, targetPosRef.current);
      return astar(newGrid, startPosRef.current, targetPosRef.current);
    });
  };

  const resetGrid = () => {
    startPosRef.current = { row: START_NODE_ROW, col: START_NODE_COL };
    targetPosRef.current = {
      row: TARGET_NODE_ROW,
      col: TARGET_NODE_COL,
    };
    setGrid(createGrid(rows, cols, startPosRef.current, targetPosRef.current));
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
        clearPath,
        startSearch,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => useContext(GridContext);
