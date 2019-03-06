const { read } = require('../util/reader');
const { Fabric } = require('../util/Fabric');

const processor = (data) => {
  const processed = data.split('\n');
  const fabric = new Fabric(processed.length);
  fabric.init(processed);

  return fabric.calc(2);
};

read('./inputs/day03.txt', processor).then((solution) => {
  console.log(solution);
});
