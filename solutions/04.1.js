const { read } = require('../util/reader');
const { GuardSchedule } = require('../util/GuardSchedule');

const processor = (data) => {
  const schedule = new GuardSchedule(data.split('\n'));
  return schedule.data;
};

read('./inputs/day04.txt', processor).then((solution) => {
  console.log(solution);
});
