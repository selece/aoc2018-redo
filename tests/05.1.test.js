const { Polymer } = require('../util/Polymer');

test('\'\' -rx-> []', () => {
  const polymer = new Polymer('');
  expect(polymer.reactUntilDone()).toEqual('');
});

test('\'Aa\' -rx-> []', () => {
  const polymer = new Polymer('Aa');
  expect(polymer.reactUntilDone()).toEqual('');
});

test('\'aA\' -rx-> []', () => {
  const polymer = new Polymer('aA');
  expect(polymer.reactUntilDone()).toEqual('');
});

test('\'abBA\' -rx-> []', () => {
  const polymer = new Polymer('abBA');
  expect(polymer.reactUntilDone()).toEqual('');
});

test('\'abAB\' -rx-> \'abAB\'', () => {
  const polymer = new Polymer('abAB');
  expect(polymer.reactUntilDone()).toEqual('abAB');
});

test('\'aabAAB\' -rx-> \'aabAAB\'', () => {
  const polymer = new Polymer('aabAAB');
  expect(polymer.reactUntilDone()).toEqual('aabAAB');
});

test('\'dabAcCaCBAcCcaDA\' -rx-> \'dabCBAcaDA\'', () => {
  const polymer = new Polymer('dabAcCaCBAcCcaDA');
  expect(polymer.reactUntilDone()).toEqual('dabCBAcaDA');
});
