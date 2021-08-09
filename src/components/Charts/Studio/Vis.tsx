import React from 'react';
import { selectAll } from 'd3-selection';
import { geoPath } from 'd3-geo';

import Studio from '../../Studio';
import { DataContext } from '../../../context/DataContext';

type Props = {
  activeIndex: number;
  startIndex: number;
};

type State = {
  studio: 'studio1' | 'studio2' | null;
  heatmap: boolean;
  favouriteBike: boolean;
};

export default class StudioViz extends React.Component<Props, State> {
  state: State = {
    studio: null,
    heatmap: false,
    favouriteBike: false,
  };

  static contextType = DataContext;

  context: any;

  props: any;

  setState: any;

  componentDidUpdate(prevProps: Props) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex: number) => {
    const { startIndex } = this.props;
    if (activeIndex === startIndex) {
      this.showStudio1();
      this.hideOverlay();
    } else if (activeIndex === startIndex + 1) {
      this.showStudio1();
      this.showHeatmap('studio-1');
    } else if (activeIndex === startIndex + 2) {
      this.showStudio1();
      this.showFavouriteBike('studio-1');
    } else if (activeIndex === startIndex + 3) {
      this.showStudio2();
      this.hideOverlay();
    } else if (activeIndex === startIndex + 4) {
      this.showStudio2();
      this.showHeatmap('studio-2');
    } else if (activeIndex === startIndex + 5) {
      this.showStudio2();
      this.showFavouriteBike('studio-2');
    } else if (activeIndex === startIndex - 1 || activeIndex === startIndex + 6) {
      this.hide();
    }
  };

  showStudio1 = () => {
    this.setState({ studio: 'studio1' });
  };

  showStudio2 = () => {
    this.setState({ studio: 'studio2' });
  };

  showHeatmap = (studio: any) => {
    this.setState({ favouriteBike: false });
    selectAll(`.heatmap-${studio}`)
      .transition()
      .duration(600)
      .attr('opacity', 1)
      .on('end', () => this.setState({ heatmap: true }));
  };

  showFavouriteBike = (studio: any) => {
    this.setState({ favouriteBike: true });
    selectAll(`.heatmap-${studio}`)
      .transition()
      .duration(600)
      .attr('opacity', 0)
      .on('end', () => this.setState({ heatmap: false }));
  };

  hideOverlay = () => {
    this.setState({ favouriteBike: false });
    selectAll(`
      .heatmap-studio-1,
      .heatmap-studio-2
    `)
      .transition()
      .duration(600)
      .attr('opacity', 0)
      .on('end', () => this.setState({ heatmap: false }));
  };

  hide = () => {
    this.setState({ studio: null });
    this.hideOverlay();
  };

  get heatmapStudio1Opacity() {
    const { studio, heatmap } = this.state;
    return studio === 'studio1' && heatmap ? 1 : 0;
  }

  get heatmapStudio2Opacity() {
    const { studio, heatmap } = this.state;
    return studio === 'studio2' && heatmap ? 1 : 0;
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
    const { studio, favouriteBike } = this.state;
    const {
      studio: {
        studio1ContourDensity,
        studio2ContourDensity,
        contourDensityColorScale,
        favouriteBikes,
      },
    } = this.context;
    return (
      <>
        <Studio
          showCircle
          showFavouriteBikes={favouriteBike}
          favouriteBikes={favouriteBikes}
          studio={studio}
          height={height}
          width={width}
          transform={this.groupTransform}
        />
        <g
          className="heatmap-studio-1"
          opacity={this.heatmapStudio1Opacity}
          transform={this.groupTransform}
        >
          {studio1ContourDensity.map((d: any) => (
            <path d={geoPath()(d) || undefined} fill={contourDensityColorScale(d.value)} />
          ))}
        </g>
        <g
          className="heatmap-studio-2"
          opacity={this.heatmapStudio2Opacity}
          transform={this.groupTransform}
        >
          {studio2ContourDensity.map((d: any) => (
            <path d={geoPath()(d) || undefined} fill={contourDensityColorScale(d.value)} />
          ))}
        </g>
        <Studio
          showText
          studio={studio}
          height={height}
          width={width}
          transform={this.groupTransform}
        />
      </>
    );
  }
}
