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

        if (Math.abs(e.charCodeAt() - a[i + 1].charCodeAt()) === 32) {
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
        this.data.splice(target, 2, Polymer.REMOVE, Polymer.REMOVE);
      });

    this.data = this.data.filter(e => e !== Polymer.REMOVE);
    return this.data.join('');
  }

  reactUntilDone() {
    let reactions = this.findReactions();

    while (reactions.length !== 0) {
      this.react(reactions);
      reactions = this.findReactions();
    }

    return this.data.join('');
  }

  remove(list) {
    this.data = this.data
      .filter(e => list.map(l => l !== e).every(f => f));

    return this.data.join('');
  }
}

Polymer.REMOVE = '-';

module.exports = { Polymer };
