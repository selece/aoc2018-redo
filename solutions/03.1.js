const { read } = require('../util/reader');
const { Fabric } = require('../util/Fabric');

const processor = (data) => {
  const fabric = new Fabric(data.split('\n'));
  return fabric.calc(2);
};

read('./inputs/day03.txt', processor).then((solution) => {
  console.log(solution);
});
