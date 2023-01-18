import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createGrid } from '../helpers/createGrid';
import lodash, { initial } from 'lodash';
import { TCell, TCellType, TGrid, TPosition } from '../types/types';
import { manhattanDistance } from '../helpers/manhattanDistance';
import {
  START_NODE_COL,
  START_NODE_ROW,
  TARGET_NODE_COL,
  TARGET_NODE_ROW,
} from '../constants/constances';
import { useAstar } from '../hooks/useAstar';
import { clearGrid } from '../helpers/clearGrid';
import { cellToInitialState } from '../helpers/cellToInitialState';
interface GridContextProps {
  grid: TGrid;
  startPosRef: React.MutableRefObject<TPosition> | null;
  targetPosRef: React.MutableRefObject<TPosition> | null;
  setGrid: React.Dispatch<React.SetStateAction<TGrid>>;
  resetGrid: () => void;
  updateNodeState: (state: TCellType, row: number, col: number) => void;
  clearPath: () => void;
  startSearch: () => void;
  clearWalls: () => void;
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
  clearWalls: () => {},
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
      const cell = newGrid[row][col];
      cell.type = type;
      if (type === 'initial') {
        newGrid[row][col] = cellToInitialState(cell, startPosRef.current, targetPosRef.current);
      }
      return newGrid;
    });
  };

  const clearPath = () => {
    setGrid(clearGrid(grid, startPosRef.current, targetPosRef.current));
  };

  const startSearch = () => {
    const newGrid = clearGrid(grid, startPosRef.current, targetPosRef.current);
    setGrid(newGrid);
    setTimeout(() => {
      setGrid(astar(newGrid, startPosRef.current, targetPosRef.current));
    }, 0);
  };

  const resetGrid = () => {
    startPosRef.current = { row: START_NODE_ROW, col: START_NODE_COL };
    targetPosRef.current = {
      row: TARGET_NODE_ROW,
      col: TARGET_NODE_COL,
    };
    setGrid(createGrid(rows, cols, startPosRef.current, targetPosRef.current));
  };
  const clearWalls = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, type: cell.type === 'wall' ? 'initial' : cell.type }))
    );
    setGrid(newGrid);
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
        clearWalls,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => useContext(GridContext);
