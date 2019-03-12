const { Polymer } = require('../util/Polymer');

test('\'\' -remove \'\' -> []', () => {
  const polymer = new Polymer('');
  expect(polymer.remove()).toEqual('');
});

test('\'dabAcCaCBAcCcaDA\' -remove \'Aa\' -> [dbcCCBcCcD] -rx-> [dbCBcD]', () => {
  const polymer = new Polymer('dabAcCaCBAcCcaDA');
  const reduced = polymer.remove(['A', 'a']);
  expect(reduced).toEqual('dbcCCBcCcD');
  expect(new Polymer(reduced).reactUntilDone()).toEqual('dbCBcD');
});

test('\'dabAcCaCBAcCcaDA\' -remove \'Bb\' -> [daAcCaCAcCcaDA] -rx-> [daCAcaDA]', () => {
  const polymer = new Polymer('dabAcCaCBAcCcaDA');
  const reduced = polymer.remove(['B', 'b']);
  expect(reduced).toEqual('daAcCaCAcCcaDA');
  expect(new Polymer(reduced).reactUntilDone()).toEqual('daCAcaDA');
});

test('\'dabAcCaCBAcCcaDA\' -remove \'Cc\' -> [dabAaBAaDA] -rx-> [daDA]', () => {
  const polymer = new Polymer('dabAcCaCBAcCcaDA');
  const reduced = polymer.remove(['C', 'c']);
  expect(reduced).toEqual('dabAaBAaDA');
  expect(new Polymer(reduced).reactUntilDone()).toEqual('daDA');
});

test('\'dabAcCaCBAcCcaDA\' -remove \'Dd\' -> [abAcCaCBAcCcaA] -rx-> [abCBAc]', () => {
  const polymer = new Polymer('dabAcCaCBAcCcaDA');
  const reduced = polymer.remove(['D', 'd']);
  expect(reduced).toEqual('abAcCaCBAcCcaA');
  expect(new Polymer(reduced).reactUntilDone()).toEqual('abCBAc');
});
