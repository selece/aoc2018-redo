const { read } = require('../util/reader');
const { InfiniteGrid } = require('../util/InfiniteGrid');

read('./inputs/day06-test.txt', (data) => {
  const grid = new InfiniteGrid(data.split('\n'));
  console.log(grid.nearestMap());
  return grid
    // map all of the nearest coordinates
    .nearestMap()

    // filter out the edge ones, we only care about bounded coordinates
    .filter(e => grid.inside
      .map(f => f.id === e.id)
      .some(g => g === true))

    // count how many points are closest to each bounded coordinate
    .reduce((res, e) => {
      if (res[e.id] === undefined) {
        res[e.id] = 0;
      }

      res[e.id] += 1;
      return res;
    }, {});
}).then((solution) => {
  console.log(solution);
});
