const { read } = require('../util/reader');
const { Fabric } = require('../util/Fabric');

const processor = (data) => {
  const fabric = new Fabric(data.split('\n'));

  return fabric.claims.reduce((answer, {
    id, x: _x, y: _y, w: _w, h: _h,
  }) => {
    if (!fabric.overlaps({
      _x, _y, _w, _h,
    })) {
      answer.push(id);
    }

    return answer;
  }, []);
};

read('./inputs/day03.txt', processor).then((solution) => {
  console.log(solution);
});
