const { read } = require('../util/reader');
const { InfiniteGrid } = require('../util/InfiniteGrid');

read('./inputs/day06-test.txt', (data) => {
  const grid = new InfiniteGrid(data.split('\n'));
  return grid
    .nearestMap()
    .filter(e => grid.inside
      .map(f => f.id === e.id)
      .some(g => g === true))
    .length;
}).then((solution) => {
  console.log(solution);
});
