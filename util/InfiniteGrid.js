// used for day 6

class InfiniteGrid {
  constructor(input) {
    // parse data into points, store (x, y) and id (index)
    this.data = input
      .map((line, idx) => {
        const { groups: { x, y } } = line.match(InfiniteGrid.PATTERN);
        return { x, y, id: idx };
      });

    // calculate extents (edges) of our grid
    this.extents = this.data
      .reduce((ext, point) => {
        const { x, y } = point;
        if (x > ext.xmax) { ext.xmax = x; } // eslint-disable-line no-param-reassign
        if (y > ext.ymax) { ext.ymax = y; } // eslint-disable-line no-param-reassign
        if (x < ext.xmin) { ext.xmin = x; } // eslint-disable-line no-param-reassign
        if (y < ext.ymin) { ext.ymin = y; } // eslint-disable-line no-param-reassign

        return ext;
      }, {
        xmin: Infinity, ymin: Infinity, xmax: 0, ymax: 0,
      });

    // mark edge points (infinite edges - exclude from interior)
    this.data = this.data
      .map(point => ({
        point,
        edge: (
          point.x === this.extents.xmin
          || point.x === this.extents.xmax
          || point.y === this.extents.ymin
          || point.y === this.extents.ymax
        ),
      }));
  }
}

InfiniteGrid.PATTERN = /(?<x>\d*), (?<y>\d*)$/;

module.exports = { InfiniteGrid };
