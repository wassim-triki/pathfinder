import React from 'react';
import { useAstar } from '../hooks/useAstar';
import { useGridContext } from '../context/gridContext';
import { ICell } from '../interfaces/ICell';

const Menu = () => {
  const { grid, setGrid, startNode, resetGrid } = useGridContext();

  const astar = useAstar();

  return (
    <div className='flex justify-center items-center flex-col gap-4 px-20'>
      <button
        className='btn px-8 w-full'
        onClick={() => {
          setGrid(astar(grid));
        }}
      >
        Start
      </button>
      <button className='btn w-full' onClick={() => resetGrid()}>
        Reset
      </button>
      <button className='btn w-full'>Clear Walls</button>
    </div>
  );
};

export default Menu;
