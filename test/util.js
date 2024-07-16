import assert from 'assert';

import { shouldSet, getAt, setAt } from '../util.js';

const num_A = 123;
const num_B = 456;
const str_A = 'foo';
const str_B = 'bar';
const arr = [123];
const obj = {'foo': 'bar'};

// [name, [param_A, param_B], definitely will need a set]
let cases = [
  ['same numbers', [num_A, num_A], false],
  ['different numbers', [num_A, num_B], true],
  ['same strings', [str_A, str_A], false],
  ['different strings', [str_A, str_B], true],
  ['any pair of objects', [obj, obj], false],
  ['any pair of arrays', [arr, arr], false],
  ['an array and object', [arr, obj], true], // non matching types
  ['an array and string', [arr, str_A], true], // ditto
  ['an object and string', [obj, str_A], true], // ditto
];


describe('utils.shouldSet(a,b)', () => {
  cases.map(([name, [a, b], expected]) => {
    it(`should expect ${expected} from '${name}'`, () => {
      assert.equal(shouldSet(a, b), expected);
    });
  });
});


const deep = {'foo': {'bar': {'baz': 'bat'}}};
const simple = {'foo': 'bar'};

describe('utils.getAt(a, path)', () => {
  it('should fetch deep values', () => {
    assert.equal(getAt(deep, ['foo', 'bar', 'baz']), 'bat')
  });
  it('shoul return undefined for nonexistent paths', () => {
    assert.equal(getAt(deep, ['foo', 'asdfghhj']), undefined);
  });
});

describe('utils.setAt(a, path)', () => {
  it('should set root object', () => {
    assert.deepEqual(setAt({}, [], 123), 123);
  });
  it('should set at shallow depth', () => {
    assert.deepEqual(setAt({}, ['foo'], 'bar'), {'foo': 'bar'});
  });
  it('should maintain existing keys', () => {
    assert.deepEqual(setAt({'foo': 'bar'}, ['baz'], 'bat'), {'foo': 'bar', 'baz': 'bat'});
  });
  it('should set deep through non existent keys', () => {
    assert.deepEqual(setAt({'foo': {'bar': {}}}, ['foo', 'bar', 'baz', 'bat', 'bang'], 'boom'),
      {'foo': {'bar': {'baz': {'bat': {'bang': 'boom'}}}}});
  });
});
