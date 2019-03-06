const { read } = require('../util/reader');

const processor = data => data;

read('./inputs/day01.txt', processor).then((solution) => {
  console.log(solution);
});
