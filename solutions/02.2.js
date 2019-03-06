const { read } = require('../util/reader');

const hamming = (base, comparison) => [...base]
  .reduce((acc, chr, idx) => {
    if (chr !== [...comparison][idx]) {
      acc.distance += 1;
      acc.position = idx;
    }

    return acc;
  }, { distance: 0, position: undefined });

const processor = data => data
  .split('\n')
  .map((base, idx, arr) => arr
    .slice(idx + 1, arr.length)
    .map((comparison) => {
      const { distance, position } = hamming(base, comparison);

      return distance === 1
        ? base.substring(0, position) + base.substring(position + 1, base.length)
        : undefined;
    }))
  .reduce((res, current) => {
    const filtered = current.filter(e => e !== undefined);
    if (filtered.length !== 0) {
      res.found = filtered.pop();
    }
    return res;
  }, { found: undefined });

read('./inputs/day02.txt', processor).then((solution) => {
  console.log(solution);
});
