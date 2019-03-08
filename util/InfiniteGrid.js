// used for day 6

class InfiniteGrid {
  constructor(input) {
    // parse data into points, store (x, y) and id (index)
    this.data = input
      .map((line, idx) => {
        const { groups: { x, y } } = line.match(InfiniteGrid.PATTERN);
        return {
          x: parseInt(x, 10),
          y: parseInt(y, 10),
          id: idx,
        };
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
        ...point,
        edge: this.isEdge(point),
      }));

    // grab all interior points
    this.inside = this.data
      .filter(e => e.edge === false);

    // full grid window bounded by extents
    const xrange = Array(Math.max(this.extents.xmax - this.extents.xmin + 1, 0))
      .fill(0).map((e, i) => e + i + this.extents.xmin);
    const yrange = Array(Math.max(this.extents.ymax - this.extents.ymin + 1, 0))
      .fill(0).map((e, i) => e + i + this.extents.ymin);

    this.window = xrange
      .reduce((xres, i) => {
        xres.push(
          yrange.reduce((yres, j) => {
            yres.push({ x: i, y: j });
            return yres;
          }, []),
        );

        return xres;
      }, [])
      .flat();
  }

  isEdge({ x, y }) {
    return x === this.extents.xmin
      || x === this.extents.xmax
      || y === this.extents.ymin
      || y === this.extents.ymax;
  }

  nearestMap() {
    // iterate through all points in the bounded window
    return this.window

      // for each point in the window, take all of the coordinates
      // and calculate the distance to each one, store that
      .map(({ x, y }) => this.data
        .map(point => ({
          ...point,
          distance: InfiniteGrid.distance({ x, y }, { ...point }),
        }))

        // TODO: filter each distance list for only the smallest distance
        // if there are more than 2 smallest entries, null it
        
      );
  }

  static distance({ x: xa, y: ya }, { x: xb, y: yb }) {
    return Math.abs(xa - xb) + Math.abs(ya - yb);
  }
}

InfiniteGrid.PATTERN = /(?<x>\d*), (?<y>\d*)$/;

module.exports = { InfiniteGrid };
