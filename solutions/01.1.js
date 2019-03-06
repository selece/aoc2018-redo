const { read } = require('../util/reader');

const processor = data => data
  .split('\n')
  .map(e => Number.parseInt(e, 10))
  .reduce((acc, e) => acc + e, 0);

read('./inputs/day01.txt', processor).then((solution) => {
  console.log(solution);
});
