import { useEffect } from 'react';

const useChartTransition = (indexToTransition, hide, activeIndex) => {
  useEffect(() => {
    if (indexToTransition[activeIndex]) {
      indexToTransition[activeIndex]();
    } else {
      hide();
    }
  }, [activeIndex, hide, indexToTransition]);
};

export default useChartTransition;