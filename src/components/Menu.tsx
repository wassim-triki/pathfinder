import React from 'react';
import { astar } from '../astar';
import { useGridContext } from '../context/gridContext';
import { ICell } from '../interfaces/ICell';

const Menu = () => {
  const { grid, setGrid, startNode } = useGridContext();

  return (
    <div className='flex justify-center items-center'>
      <button
        className='btn px-8'
        onClick={() => {
          setGrid(astar(grid, startNode));
          // console.log(astar(grid));
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Menu;
