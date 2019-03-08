const { read } = require('../util/reader');
const { InfiniteGrid } = require('../util/InfiniteGrid');

read('./inputs/day06-test.txt', (data) => {
  const grid = new InfiniteGrid(data.split('\n'));
  return grid.nearestMap(grid.window({ x: 4, y: 4 }, 4));
}).then((solution) => {
  console.log(solution);
});
