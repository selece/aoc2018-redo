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
        ...point,
        edge: this.isEdge(point),
      }));

    // grab all interior points
    this.inside = this.data
      .filter(e => e.edge === false);
  }

  isEdge({ x, y }) {
    return x === this.extents.xmin
      || x === this.extents.xmax
      || y === this.extents.ymin
      || y === this.extents.ymax;
  }

  isInside({ x, y }) {
    return x > this.extents.xmin
      || x < this.extents.xmax
      || y > this.extents.ymin
      || y < this.extents.ymax;
  }

  window({ x, y }, size) {
    const xmin = Math.max(x - size, this.extents.xmin);
    const xmax = Math.min(x + size, this.extents.xmax);
    const ymin = Math.max(y - size, this.extents.ymin);
    const ymax = Math.min(y + size, this.extents.ymax);

    const xrange = Array(Math.max(xmax - xmin + 1, 0)).fill(0).map((e, i) => e + i + xmin);
    const yrange = Array(Math.max(ymax - ymin + 1, 0)).fill(0).map((e, i) => e + i + ymin);

    return xrange.reduce((xres, i) => {
      xres.push(
        yrange.reduce((yres, j) => {
          yres.push({ x: i, y: j });
          return yres;
        }, []),
      );

      return xres;
    }, []).flat();
  }

  nearestMap(input) {
    return input
      .map(({ x, y }) => this.data
        .map(e => ({
          ...e,
          distance: InfiniteGrid.distance({ x, y }, { ...e }),
        }))
        .reduce((min, elem) => {
          if (elem.distance < min.distance) {
            min = { ...elem }; // eslint-disable-line no-param-reassign
          }

          return min;
        }, { distance: Infinity, id: undefined }));
  }

  static distance({ x: xa, y: ya }, { x: xb, y: yb }) {
    return Math.abs(xa - xb) + Math.abs(ya - yb);
  }
}

InfiniteGrid.PATTERN = /(?<x>\d*), (?<y>\d*)$/;

module.exports = { InfiniteGrid };
