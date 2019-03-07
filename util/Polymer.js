// used for day 5 puzzle

class Polymer {
  constructor(input) {
    this.data = input.split('');
  }

  findReactions() {
    return this.data
      .reduce((reacted, e, i, a) => {
        if (a.length <= 1 || i + 1 === a.length) {
          return reacted;
        }

        if (e === a[i + 1].toUpperCase() || e === a[i + 1].toLowerCase()) {
          if (reacted.filter(([, target]) => target === i).length === 0) {
            reacted.push([i, i + 1]);
          }
        }

        return reacted;
      }, []);
  }

  react(list) {
    list
      .forEach((react) => {
        const [target] = react;
        this.data.splice(target, 2, Polymer.NULLED, Polymer.NULLED);
      });

    return this.data.filter(e => e !== Polymer.NULLED);
  }
}

Polymer.NULLED = '-';

module.exports = { Polymer };