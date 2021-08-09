import { scaleLinear } from 'd3-scale';
import { contourDensity } from 'd3-contour';
import { nest } from 'd3-collection';
import { max } from 'd3-array';

import * as Studio1 from '../components/Studio/studio1';
import * as Studio2 from '../components/Studio/studio2';

const studio1ContourDensity = (bookingHistory, width, height) => {
  const densityData = contourDensity()
    .x(function(d) {
      return Studio1.getX(d.spot);
    })
    .y(function(d) {
      return Studio1.getY(d.spot);
    })
    .size([width, height])
    .bandwidth(15)(bookingHistory.filter(d => d.studio === 'Studio 1'));
  return densityData;
};

const studio2ContourDensity = (bookingHistory, width, height) => {
  const densityData = contourDensity()
    .x(function(d) {
      return Studio2.getX(d.spot);
    })
    .y(function(d) {
      return Studio2.getY(d.spot);
    })
    .size([width, height])
    .bandwidth(15)(bookingHistory.filter(d => d.studio === 'Studio 2'));
  return densityData;
};

const contourDensityColorScale = () => {
  return scaleLinear()
    .domain([0, 0.0008]) // Points per square pixel.
    .range(['white', '#a71b52']);
};

const favouriteBikes = (bookingHistory) => {
  const bikeCount = nest()
    .key(function(d) {
      return d.spot;
    })
    .rollup(function(v) {
      return v.length;
    })
    .entries(bookingHistory);
  const maxBikeValue = max(bikeCount, d => d.value);
  return bikeCount
    .filter(({ value }) => value === maxBikeValue)
    .map(({ key }) => Number(key));
};

const data = ({ bookingHistory, width, height }) => ({
  studio1ContourDensity: studio1ContourDensity(bookingHistory, width, height),
  studio2ContourDensity: studio2ContourDensity(bookingHistory, width, height),
  contourDensityColorScale: contourDensityColorScale(),
  favouriteBikes: favouriteBikes(bookingHistory),
});

export default data;
