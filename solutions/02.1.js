const { read } = require('../util/reader');

const processor = (data) => {
  const { count2, count3 } = data

    // split input into lines, split each line into char array
    .split('\n')
    .map(e => Array.from(e))

    // take char array, transform into a count of each char
    .map(e => e.reduce(
      (acc, chr) => {
        acc[chr] = (acc[chr] || 0) + 1;
        return acc;
      }, {},
    ))

    // take each char array, count how many 2s/3s char instances there are
    .reduce(
      (acc, count) => {
        acc.count2 += Object.keys(count).some(e => count[e] === 2) ? 1 : 0;
        acc.count3 += Object.keys(count).some(e => count[e] === 3) ? 1 : 0;

        return acc;
      }, { count2: 0, count3: 0 },
    );

  return count2 * count3;
};

read('./inputs/day02.txt', processor).then((solution) => {
  console.log(solution);
});
