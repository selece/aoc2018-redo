// used for day 4 solution

class GuardSchedule {
  constructor(input) {
    this.schedule = {};
    this.process(input);
  }

  process(input) {
    this.schedule = input

      // process each line into a parsed object { timestamp, id, falls, wakes }
      .map((line) => {
        const {
          groups: {
            timestamp, ymd, min, id, falls, wakes,
          },
        } = line.match(GuardSchedule.PATTERN);
        return {
          timestamp, ymd, id, min, falls, wakes,
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
      // change falls/wakes to single state variable
      .reduce((res, elem) => {
        const {
          timestamp, ymd, id, min, falls, wakes,
        } = elem;

        if (id !== undefined) {
          res.active = id;
        }

        let state;
        if (falls === undefined && wakes === undefined) {
          state = GuardSchedule.STATES.START;
        }

        if (falls === undefined && wakes !== undefined) {
          state = GuardSchedule.STATES.WAKE;
        }

        if (falls !== undefined && wakes === undefined) {
          state = GuardSchedule.STATES.SLEEP;
        }

        res.data.push({
          timestamp,
          ymd,
          min: parseInt(min, 10),
          state,
          id: res.active,
        });
        return res;
      }, { active: undefined, data: [] })

      // return just the parsed data portion
      .data

    // parse the schedule -> split into day objects, mark each guards awake/sleep time per day
      .reduce((res, elem) => {
        const {
          ymd, min, id, state,
        } = elem;

        if (res[id] === undefined) {
          res[id] = {};
        }

        switch (state) {
          case GuardSchedule.STATES.START:
            break;

          case GuardSchedule.STATES.WAKE:
            res[id][ymd].fill(1, min);
            break;

          case GuardSchedule.STATES.SLEEP:
            if (res[id][ymd] === undefined) {
              res[id][ymd] = Array(60).fill(1);
            }

            res[id][ymd].fill(0, min);
            break;

          default:
            console.error('PANIC - unhandled state ::', state);
        }

        return res;
      }, {});
  }

  findSleepyGuard() {
    const results = Object.entries(this.schedule)
      .reduce((acc, schedule) => {
        const [id, days] = schedule;
        acc[id] = Object.entries(days).reduce((scheduleTotal, day) => {
          const [, minutes] = day;
          return scheduleTotal + minutes.reduce((dayTotal, e) => dayTotal + (e ? 0 : 1), 0);
        }, 0);

        return acc;
      }, {});

    return Object.entries(results)
      .sort(([, a], [, b]) => {
        if (a - b < 0) { return 1; }
        if (a - b > 0) { return -1; }
        return 0;
      })
      .shift();
  }

  findSleepyMinute(guard) {
    return Object.entries(this.schedule[guard])
      .reduce((sleepMap, day) => {
        const [, minutes] = day;
        return sleepMap.map((e, i) => e + (minutes[i] ? 0 : 1));
      }, Array(60).fill(0))
      .reduce((res, e, idx) => {
        if (e > res.max) {
          res.max = e;
          res.index = idx;
        }

        return res;
      }, { max: 0, index: 0 })
      .index;
  }
}

GuardSchedule.PATTERN = /^\[(?<timestamp>(?<ymd>\d*-\d*-\d*) \d\d:(?<min>\d\d))\] (Guard #(?<id>\d*)|(?<falls>falls)|(?<wakes>wakes))/;
GuardSchedule.STATES = { START: 0, SLEEP: 1, WAKE: 2 };

module.exports = { GuardSchedule };
