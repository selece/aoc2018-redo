const { read } = require('../util/reader');

function* loopedGeneratorFrom(arr) {
  let idx = 0;
  while (true) {
    yield arr[idx % arr.length];
    idx += 1;
  }
}

const processor = (data) => {
  const processed = data
    .split('\n')
    .map(e => Number.parseInt(e, 10));

  const values = loopedGeneratorFrom(processed);
  let frequency = 0;
  let found;
  const search = [];

  while (found === undefined) {
    frequency += values.next().value;

    if (search.includes(frequency)) {
      found = frequency;
    } else {
      search.push(frequency);
    }
  }

  return found;
};

read('./inputs/day01.txt', processor).then((solution) => {
  console.log(solution);
});
