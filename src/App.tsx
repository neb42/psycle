import * as React from 'react';

import Banner from './components/Banner';
import Visualisations from './components/Visualisations';
import { useDataContext } from './context/DataContext';

const App = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);

  const { loaded, width, height, margin } = useDataContext();

  return (
    <>
      <Banner />
      {loaded && <Visualisations width={width} height={height} margin={margin} />}
    </>
  );
};

export default App;
