import { select } from 'd3-selection';
import { timer } from 'd3-timer';
import { dispatch } from 'd3-dispatch';
import { bisect } from 'd3-array';

/**
 * scroller - handles the details
 * of figuring out which section
 * the user is currently scrolled
 * to.
 *
 */

export default class Scroller {
  container;

  dispatch;

  sections;

  sectionPositions;

  currentIndex;

  containerStart;

  timer;

  constructor() {
    this.container = select('body');
    // event dispatcher
    this.dispatch = dispatch('active', 'progress');

    // d3 selection of all the
    // text sections that will
    // be scrolled through
    this.sections = null;

    // array that will hold the
    // y coordinate of each section
    // that is scrolled through
    this.sectionPositions = [];
    this.currentIndex = -1;
    // y coordinate of
    this.containerStart = 0;
  }

  /**
   * scroll - constructor function.
   * Sets up scroller to monitor
   * scrolling of els selection.
   *
   * @param els - d3 selection of
   *  elements that will be scrolled
   *  through by user.
   */
  scroll = els => {
    this.sections = els;

    // when window is scrolled call
    // position. When it is resized
    // call resize.
    select(window)
      .on('scroll.scroller', this.position)
      .on('resize.scroller', this.resize);

    // manually call resize
    // initially to setup
    // scroller.
    this.resize();

    // hack to get position
    // to be called once for
    // the scroll position on
    // load.
    // @v4 timer no longer stops if you
    // return true at the end of the callback
    // function - so here we stop it explicitly.
    this.timer = timer(() => {
      this.position();
      this.timer.stop();
    });
  };

  /**
   * container - get/set the parent element
   * of the sections. Useful for if the
   * scrolling doesn't start at the very top
   * of the page.
   *
   * @param value - the new container value
   */
  scrollContainer = value => {
    // if (arguments.length === 0) {
    //   return container;
    // }
    this.container = value;
  };

  // @v4 There is now no d3.rebind, so this implements
  // a .on method to pass in a callback to the dispatcher.
  on = (action, callback) => {
    this.dispatch.on(action, callback);
  };

  /**
   * resize - called initially and
   * also when page is resized.
   * Resets the sectionPositions
   *
   */
  resize = () => {
    // sectionPositions will be each sections
    // starting position relative to the top
    // of the first section.
    this.sectionPositions = [];
    let startPos;
    const that = this;
    this.sections.each(function(d, i) {
      const { top } = this.getBoundingClientRect();
      if (i === 0) {
        startPos = top;
      }
      that.sectionPositions.push(top - startPos);
    });
    this.containerStart = this.container.node().getBoundingClientRect().top + window.pageYOffset;
  };

  /**
   * position - get current users position.
   * if user has scrolled to new section,
   * dispatch active event with new section
   * index.
   *
   */
  position = () => {
    const pos = window.pageYOffset - 10 - this.containerStart;
    let sectionIndex = bisect(this.sectionPositions, pos);
    sectionIndex = Math.min(this.sections.size() - 1, sectionIndex);

    if (this.currentIndex !== sectionIndex) {
      // @v4 you now `.call` the dispatch callback
      this.dispatch.call('active', this, sectionIndex);
      this.currentIndex = sectionIndex;
    }

    const prevIndex = Math.max(sectionIndex - 1, 0);
    const prevTop = this.sectionPositions[prevIndex];
    const progress = (pos - prevTop) / (this.sectionPositions[sectionIndex] - prevTop);
    // @v4 you now `.call` the dispatch callback
    this.dispatch.call('progress', this, this.currentIndex, progress);
  };
}
