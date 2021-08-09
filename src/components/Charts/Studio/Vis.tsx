import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-s... Remove this comment to see the full error message
import { selectAll } from 'd3-selection';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-t... Remove this comment to see the full error message
import { transition } from 'd3-transition';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-g... Remove this comment to see the full error message
import { geoPath } from 'd3-geo';

import Studio from '../../Studio';
import { BookingHistoryContext } from '../../../context/BookingHistory';

type State = any;

export default class StudioViz extends React.Component<{}, State> {
  state = {
    studio: null,
    heatmap: false,
    favouriteBike: false,
  };

  static contextType = BookingHistoryContext;

  context: any;
  props: any;
  setState: any;

  componentDidUpdate(prevProps: {}) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeIndex' does not exist on type '{}'... Remove this comment to see the full error message
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex: any) => {
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
      .transition(transition().duration(600))
      .attr('opacity', 1)
      .on('end', () => this.setState({ heatmap: true }));
  };

  showFavouriteBike = (studio: any) => {
    this.setState({ favouriteBike: true });
    selectAll(`.heatmap-${studio}`)
      .transition(transition().duration(600))
      .attr('opacity', 0)
      .on('end', () => this.setState({ heatmap: false }));
  };

  hideOverlay = () => {
    this.setState({ favouriteBike: false });
    selectAll(`
      .heatmap-studio-1,
      .heatmap-studio-2
    `)
      .transition(transition().duration(600))
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
      <React.Fragment>
        <Studio
          showCircle
          showFavouriteBikes={favouriteBike}
          favouriteBikes={favouriteBikes}
          studio={studio}
          height={height}
          width={width}
          transform={this.groupTransform}
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <g
          className="heatmap-studio-1"
          opacity={this.heatmapStudio1Opacity}
          transform={this.groupTransform}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          {studio1ContourDensity.map((d: any) => <path d={geoPath()(d)} fill={contourDensityColorScale(d.value)} />)}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </g>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <g
          className="heatmap-studio-2"
          opacity={this.heatmapStudio2Opacity}
          transform={this.groupTransform}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          {studio2ContourDensity.map((d: any) => <path d={geoPath()(d)} fill={contourDensityColorScale(d.value)} />)}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </g>
        <Studio
          showText
          studio={studio}
          height={height}
          width={width}
          transform={this.groupTransform}
        />
      </React.Fragment>
    );
  }
}
