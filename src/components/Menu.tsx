import React from 'react';
import { useAstar } from '../hooks/useAstar';
import { useGridContext } from '../context/gridContext';

const Menu = () => {
  const { grid, setGrid, startSearch, resetGrid, clearPath, startPosRef } = useGridContext();

  const astar = useAstar();

  return (
    <div className='flex justify-center items-center flex-col gap-4 px-20'>
      <button className='btn px-8 w-full' onClick={() => startSearch()}>
        Start
      </button>
      <button className='btn w-full' onClick={() => resetGrid()}>
        Reset
      </button>
      <button className='btn w-full' onClick={() => clearPath()}>
        Clear Path
      </button>
    </div>
  );
};

export default Menu;
