const { read } = require('../util/reader');
const { GuardSchedule } = require('../util/GuardSchedule');

const processor = (data) => {
  const processed = new GuardSchedule(data.split('\n'));
  return processed.getCombinedSleepmaps();
};

read('./inputs/day04-test.txt', processor).then((solution) => {
  console.log(solution);
});
