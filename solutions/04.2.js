const { read } = require('../util/reader');
const { GuardSchedule } = require('../util/GuardSchedule');

const processor = (data) => {
  const processed = new GuardSchedule(data.split('\n'));
  const { id, minute } = processed.getConsistentGuard();
  return id * minute;
};

read('./inputs/day04.txt', processor).then((solution) => {
  console.log(solution);
});
