import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import { geoPath } from 'd3-geo';

import Studio from '../../Studio';
import { BookingHistoryContext } from '../../../context/BookingHistory';

export default class StudioViz extends React.Component {
  state = {
    studio: null,
    overlay: null,
  };

  static contextType = BookingHistoryContext;
  
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
      this.hideOverlay();
    } else if (activeIndex === 6) {
      this.showStudio1();
      this.showHeatmap('studio-1');
    } else if (activeIndex === 7) {
      this.showStudio1();
      this.showFavouriteBike('studio-1');
    } else if (activeIndex === 8) {
      this.showStudio2();
      this.hideOverlay();
    } else if (activeIndex === 9) {
      this.showStudio2();
      this.showHeatmap('studio-2');
    } else if (activeIndex === 10) {
      this.showStudio2();
      this.showFavouriteBike('studio-2');
    } else if (activeIndex === 4 || activeIndex === 11) {
      this.hide();
    }
  }

  showStudio1 = () => {
    this.setState({ studio: 'studio1' });
  }

  showStudio2 = () => {
    this.setState({ studio: 'studio2' });
  }

  showHeatmap = studio => {
    selectAll(`.heatmap-${studio}`)
      .transition(transition().duration(600))
      .attr('opacity', 0.8)
      .on('end', () => this.setState({ overlay: 'heatmap' }));
  }

  showFavouriteBike = studio => {
    selectAll(`.heatmap-${studio}`)
      .transition(transition().duration(600))
      .attr('opacity', 0);

    selectAll(`.favourite-bike-${studio}`)
      .transition(transition().duration(600))
      .attr('opacity', 1)
      .on('end', () => this.setState({ overlay: 'favourite-bike' }));
  }

  hideOverlay = () => {
    selectAll(`
      .heatmap-studio-1,
      .favourite-bike-studio-1
      .heatmap-studio-2,
      .favourite-bike-studio-2
    `)
      .transition(transition().duration(600))
      .attr('opacity', 0)
      .on('end', () => this.setState({ overlay: null }));
  }

  hide = () => {
    this.setState({ studio: null });
    this.hideOverlay();
  }

  get heatmapStudio1Opacity() {
    const { studio, overlay } = this.state;
    return studio === 'studio1' && overlay === 'heatmap' ? 1 : 0;
  }

  get heatmapStudio2Opacity() {
    const { studio, overlay } = this.state;
    return studio === 'studio2' && overlay === 'heatmap' ? 1 : 0;
  }

  get groupTransform() {
    const { width, height } = this.props;
    const maxWidth = 588;
    const maxHeight = 220;
    const x = (width - maxWidth) / 2;
    const y = (height - maxHeight) / 2;
    return `translate(${x}, ${y})`;
  }

  render() {
    const { height, width } = this.props;
    const { studio } = this.state;
    const { studio: {
      studio1ContourDensity,
      studio2ContourDensity,
      contourDensityColorScale,
    }} = this.context;
    return (
      <React.Fragment>
        <Studio showCircle studio={studio} height={height} width={width} transform={this.groupTransform} />
        <g className="heatmap-studio-1" opacity={this.heatmapStudio1Opacity} transform={this.groupTransform}>
          {studio1ContourDensity.map(d => (
            <path d={geoPath()(d)} fill={contourDensityColorScale(d.value)} />
          ))}
        </g>
        <g className="heatmap-studio-2" opacity={this.heatmapStudio2Opacity} transform={this.groupTransform}>
          {studio2ContourDensity.map(d => (
            <path d={geoPath()(d)} fill={contourDensityColorScale(d.value)} />
          ))}
        </g>
        <Studio showText studio={studio} height={height} width={width} transform={this.groupTransform} />
      </React.Fragment>
    );
  }
}
