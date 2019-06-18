import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import { geoPath } from 'd3-geo';

import Studio from '../../Studio';

export default class StudioViz extends React.Component {
  state = {
    studio: null,
    overlay: null,
  };
  
  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;
  
    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }
  
  handleActiveIndexChange = (activeIndex) => {
    if (activeIndex === 5) {
      this.showStudio1();
    } else if (activeIndex === 6) {
      this.showHeatmap();
    } else if (activeIndex === 7) {
      this.showFavouriteBike();
    } else if (activeIndex === 8) {
      this.showStudio2();
    } else if (activeIndex === 9) {
      this.showHeatmap();
    } else if (activeIndex === 10) {
      this.showFavouriteBike();
    } else if (activeIndex === 4 || activeIndex === 11) {
      this.hide();
    }
  }

  showStudio1 = () => {
    this.setState({ studio: 'studio1', overlay: null });
  }

  showStudio2 = () => {
    this.setState({ studio: 'studio2', overlay: null });
  }

  showHeatmap = () => {
    this.setState({ overlay: 'heatmap' });
  }

  showFavouriteBike = () => {
    this.setState({ overlay: 'favourite-bike' });
  }

  hideOverlay = () => {
    this.setState({ overlay: null });
  }

  hide = () => {
    this.setState({ studio: null, overlay: null });
  }

  get heatmapStudio1Opacity() {
    const { studio, overlay } = this.state;
    return studio === 'studio1' && overlay === 'heatmap' ? 0.8 : 0;
  }

  get heatmapStudio2Opacity() {
    const { studio, overlay } = this.state;
    return studio === 'studio2' && overlay === 'heatmap' ? 0.8 : 0;
  }

  render() {
    const {
      studio1ContourDensity,
      studio2ContourDensity,
      contourDensityColorScale,
    } = this.props;
    console.log(geoPath(studio1ContourDensity[0]))
    return (
      // <Studio1 opacity={visible ? 1 : 0} />
      <React.Fragment>
        <Studio />
        <g opacity={this.heatmapStudio1Opacity}>
          {studio1ContourDensity.map(d => (
            <path d={geoPath()(d)} fill={contourDensityColorScale(d.value)} />
          ))}
        </g>
        <g opacity={this.heatmapStudio2Opacity}>
          {studio2ContourDensity.map(d => (
            <path d={geoPath()(d)} fill={contourDensityColorScale(d.value)} />
          ))}
        </g>
      </React.Fragment>
    );
  }
}
