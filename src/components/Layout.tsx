import React, { useEffect, useState } from 'react';
import { GridContextProvider, useGridContext } from '../context/gridContext';
import { ICell } from '../interfaces/ICell';
import Grid from './Grid';
import Menu from './Menu';

const Layout = () => {
  return (
    <GridContextProvider rows={20} cols={37}>
      <div className='grid grid-cols-5 border-2x border-white w-full'>
        <Grid />
        <Menu />
      </div>
    </GridContextProvider>
  );
};

export default Layout;
