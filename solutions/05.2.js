const { read } = require('../util/reader');
const { Polymer } = require('../util/Polymer');

const processor = (data) => {
  const reduced = new Polymer(data).reactUntilDone();

  const removals = [
    ['a', 'A'],
    ['b', 'B'],
    ['c', 'C'],
    ['d', 'D'],
    ['e', 'E'],
    ['f', 'F'],
    ['g', 'G'],
    ['h', 'H'],
    ['i', 'I'],
    ['j', 'J'],
    ['k', 'K'],
    ['l', 'L'],
    ['m', 'M'],
    ['n', 'N'],
    ['o', 'O'],
    ['p', 'P'],
    ['q', 'Q'],
    ['r', 'R'],
    ['s', 'S'],
    ['t', 'T'],
    ['u', 'U'],
    ['v', 'V'],
    ['w', 'W'],
    ['x', 'X'],
    ['y', 'Y'],
    ['z', 'Z'],
  ];
  return removals
    .map(f => new Polymer(new Polymer(reduced).remove(f)).reactUntilDone().length)
    .reduce((min, elem) => {
      if (min > elem) {
        min = elem; // eslint-disable-line no-param-reassign
      }

      return min;
    }, Infinity);
};

read('./inputs/day05.txt', processor).then((solution) => {
  console.log(solution);
});
