const { read } = require('../util/reader');
const { GuardSchedule } = require('../util/GuardSchedule');

const processor = (data) => {
  const processed = new GuardSchedule(data.split('\n'));
  const [sleepyGuard] = processed.getSleepyGuard();
  const sleepyMinute = processed.getSleepyMinute(sleepyGuard);
  return sleepyGuard * sleepyMinute;
};

read('./inputs/day04.txt', processor).then((solution) => {
  console.log(solution);
});
