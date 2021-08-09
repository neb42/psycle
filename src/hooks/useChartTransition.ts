import { useEffect } from 'react';

const useChartTransition = (indexToTransition: any, hide: any, activeIndex: any) => {
  useEffect(() => {
    if (indexToTransition[activeIndex]) {
      indexToTransition[activeIndex]();
    } else {
      hide();
    }
  }, [activeIndex, hide, indexToTransition]);
};

export default useChartTransition;
