import React from 'react';
import { useAstar } from '../hooks/useAstar';
import { useGridContext } from '../context/gridContext';

const Menu = () => {
  const { grid, setGrid, startSearch, resetGrid, clearPath, clearWalls } = useGridContext();

  const astar = useAstar();

  return (
    <div className='flex justify-center  items-center flex-col gap-2 px-0'>
      <div className='flex gap-2 w-full justify-between'>
        <button className='btn flex-1' onClick={() => startSearch()}>
          Start
        </button>
        <button className='btn flex-1' onClick={() => resetGrid()}>
          Reset
        </button>
      </div>

      <div className='flex gap-2 w-full justify-between'>
        <button className='btn flex-1' onClick={() => clearPath()}>
          Clear Path
        </button>
        <button className='btn flex-1' onClick={() => clearWalls()}>
          Clear Walls
        </button>
      </div>
    </div>
  );
};

export default Menu;
