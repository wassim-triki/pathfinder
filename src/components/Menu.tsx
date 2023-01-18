import React from 'react';
import { useAstar } from '../hooks/useAstar';
import { useGridContext } from '../context/gridContext';
import { RiRestartLine } from 'react-icons/ri';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { TbWall } from 'react-icons/tb';
import { RiRouteLine } from 'react-icons/ri';
const Menu = () => {
  const { grid, setGrid, startSearch, resetGrid, clearPath, clearWalls } = useGridContext();

  const astar = useAstar();

  return (
    <div className='flex justify-center  items-center flex-col gap-2 px-0'>
      <div className='flex gap-2 w-full justify-between'>
        <button className='btn flex-1' onClick={() => startSearch()}>
          <AiOutlinePlayCircle className='icon' />
          <span> Start</span>
        </button>
        <button className='btn flex-1' onClick={() => resetGrid()}>
          <RiRestartLine className='icon' />
          <span>Reset</span>
        </button>
      </div>

      <div className='flex gap-2 w-full justify-between'>
        <button className='btn flex-1' onClick={() => clearPath()}>
          <RiRouteLine className='icon' />
          <span>Clear Path</span>
        </button>
        <button className='btn flex-1' onClick={() => clearWalls()}>
          <TbWall className='icon' />
          <span> Clear Walls</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
