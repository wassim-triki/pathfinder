import { useState } from 'react';
import Grid from './components/Grid';
import Layout from './components/Layout';

function App() {
  return (
    <div className='max-w-[1500px] mx-auto my-auto px-1 py-8 text-center'>
      {/* <h1 className='text-6xl font-semibold'>Pathfinder</h1> */}
      <Layout />
    </div>
  );
}

export default App;
