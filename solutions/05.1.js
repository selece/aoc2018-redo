const { read } = require('../util/reader');

const processor = (data) => {
  console.log('working');
  return data + 1;
};

read('./inputs/day05-test.txt', processor).then((solution) => {
  console.log(solution);
});
