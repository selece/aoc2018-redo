// used for day 4 solution

class GuardSchedule {
  constructor(input) {
    this.guards = [];
    this.schedule = [];
    this.data = [];

    this.process(input);
  }

  process(input) {
    this.data = input

      // process each line into a parsed object { timestamp, id, falls, wakes }
      .map((line) => {
        const {
          groups: {
            timestamp, id, falls, wakes,
          },
        } = line.match(GuardSchedule.pattern);
        return {
          timestamp, id, falls, wakes,
        };
      })

      // sort the array by the timestamp field
      .sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return -1;
        }

        if (a.timestamp > b.timestamp) {
          return 1;
        }

        return 0;
      })

      // fill in missing ids down the line for falls/wakes entries
      .reduce((res, elem) => {
        const {
          timestamp, id, falls, wakes,
        } = elem;

        if (id !== undefined) {
          res.active = id;
        }

        res.data.push({
          timestamp,
          falls,
          wakes,
          id: res.active,
        });
        return res;
      }, { active: undefined, data: [] })

      // return just the parsed data portion
      .data;
  }
}

GuardSchedule.pattern = /^\[(?<timestamp>\d*-\d*-\d* \d\d:\d\d)\] (Guard #(?<id>\d*)|(?<falls>falls)|(?<wakes>wakes))/;

module.exports = { GuardSchedule };
