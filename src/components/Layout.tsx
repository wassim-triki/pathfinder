import React, { useState } from 'react';
import { GridContext } from '../context/gridContext';
import { ICell } from '../interfaces/ICell';
import Grid from './Grid';
import Menu from './Menu';

const Layout = () => {
  const [grid, setGrid] = useState([]);

  return (
    <GridContext.Provider value={{ grid, setGrid }}>
      <div className='grid grid-cols-5 border-2x border-white w-full'>
        <Grid rows={20} cols={37} />
        {/* <Grid rows={10} cols={10} /> */}
        <Menu />
      </div>
    </GridContext.Provider>
  );
};

export default Layout;
