import { scaleLinear } from 'd3-scale';
import { contourDensity } from 'd3-contour';

import * as Studio1 from '../components/Studio/studio1';
import * as Studio2 from '../components/Studio/studio2';

export const studio1ContourDensity = (bookingHistory, width, height) => {
  const densityData = contourDensity()
    .x(function(d) { return Studio1.getX(d.bike); })
    .y(function(d) { return Studio1.getY(d.bike); })
    .size([width, height])
    .bandwidth(15)(
      bookingHistory.filter(d => d.studio === 'Studio 1')
    );
  return densityData;
}

export const studio2ContourDensity = (bookingHistory, width, height) => {
  const densityData = contourDensity()
    .x(function(d) { return Studio2.getX(d.bike); })
    .y(function(d) { return Studio2.getY(d.bike); })
    .size([width, height])
    .bandwidth(15)(
      bookingHistory.filter(d => d.studio === 'Studio 2')
    );
  return densityData;
}

export const contourDensityColorScale = () => {
  return scaleLinear()
    .domain([0, 0.0008]) // Points per square pixel.
    .range(["white", "#a71b52"]);
}

const data = ({ bookingHistory, width, height }) => ({
  studio1ContourDensity: studio1ContourDensity(bookingHistory, width, height),
  studio2ContourDensity: studio2ContourDensity(bookingHistory, width, height),
  contourDensityColorScale: contourDensityColorScale(), 
});

export default data;