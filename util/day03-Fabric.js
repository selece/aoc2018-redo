class Fabric {
  constructor(size) {
    // make a size x size (square) grid with 0 in each value
    // aka make array of arrays, all the same size
    this.grid = Array.from(
      { length: size },
      () => Array.from({ length: size }, () => 0),
    );
  }

  // writes a new claim to the grid, incrementing the value in each of the cells
  // for an area defined by { x, y, w, h } given
  write({
    _x, _y, _w, _h,
  }) {
    this.grid = this.grid.map((row, y) => {
      // while we are inside the height of the input
      if (y >= _y && y < _y + _h) {
        return row.map((v, x) => {
          // while we are inside the width of the input
          // increase the value (overlap count) by 1
          if (x >= _x && x < _x + _w) {
            return v + 1;
          }

          // otherwise just give the current value back
          return v;
        });
      }

      // return the new row
      return row;
    });
  }

  // note: we disable eslint for param-reassign for reduce adding to the accumulator
  // calculates total claim value over the grid where value >= threshold given
  calc(threshold) {
    return this.grid.reduce((total, row) => {
      total += row.reduce((acc, val) => { // eslint-disable-line no-param-reassign
        acc += val >= threshold ? 1 : 0; // eslint-disable-line no-param-reassign
        return acc;
      }, 0);

      return total;
    }, 0);
  }

  // checks the region defined by { x, y, w, h } to see if any are value > 1
  // aka if they've been reserved by more than 1 claim
  overlaps({
    _x, _y, _w, _h,
  }) {
    const contains = this.grid
      .slice(_y, _y + _h)
      .map(row => row.slice(_x, _x + _w));

    if (contains.some(row => row.some(e => e > 1))) {
      return true;
    }

    return false;
  }
}

Fabric.pattern = /^#(?<id>\d*) @ (?<x>\d*),(?<y>\d*): (?<w>\d*)x(?<h>\d*)/;

module.exports = { Fabric };
