const { read } = require('../util/reader');
const { Polymer } = require('../util/Polymer');

const processor = (data) => {
  const poly = new Polymer(data);
  console.log(poly.react(poly.findReactions()));
  return -1;
};

read('./inputs/day05-test.txt', processor).then((solution) => {
  console.log(solution);
});
