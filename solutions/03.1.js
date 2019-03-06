const { read } = require('../util/reader');
const { Fabric } = require('../util/day03-Fabric');

const processor = (data) => {
  const processed = data
    .split('\n')
    .map((line) => {
      const { groups: { id, x, y, w, h } } = line.match(Fabric.pattern);
      return {
        id,
        x: Number.parseInt(x, 10),
        y: Number.parseInt(y, 10),
        w: Number.parseInt(w, 10),
        h: Number.parseInt(h, 10),
      };
    });

  const fabric = new Fabric(processed.length);
  processed.forEach(({
    x: _x, y: _y, w: _w, h: _h,
  }) => {
    fabric.write({
      _x, _y, _w, _h,
    });
  });

  return fabric.calc(2);
};

read('./inputs/day03.txt', processor).then((solution) => {
  console.log(solution);
});
