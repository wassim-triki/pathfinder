import { COLS, ROWS } from '../constants/constances';
import { GridContextProvider, useGridContext } from '../context/gridContext';
import Grid from './Grid';
import Menu from './Menu';

const Layout = () => {
  return (
    <GridContextProvider rows={ROWS} cols={COLS}>
      <div className='grid grid-cols-5 border-2x border-white w-full'>
        <Grid />
        <Menu />
      </div>
    </GridContextProvider>
  );
};

export default Layout;
