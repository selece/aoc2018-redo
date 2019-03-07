const { read } = require('../util/reader');
const { Polymer } = require('../util/Polymer');

const processor = (data) => {
  const poly = new Polymer(data);
  return poly.reactUntilDone().length;
};

read('./inputs/day05.txt', processor).then((solution) => {
  console.log(solution);
});
