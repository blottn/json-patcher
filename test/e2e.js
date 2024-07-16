import { apply } from '../apply.js';
import { diff } from '../diff.js';

import assert from 'assert';

const empty = {};
const number = 123.456
const string = 'lorem ipsum';
const bool = true;
const simple = {'foo': 'bar'};
const deep = {'foo': {'bar': {'baz': 'bat'}}};
const array = [simple, deep];
const complex = {
  array,
  empty,
  deep,
}

const inputs = { simple, empty, number, string, bool, deep, array, complex };

let clone = (o) => JSON.parse(JSON.stringify(o));

const pairs = Object.keys(inputs).flatMap((e, i) => Object.keys(inputs).filter((_, j) => j >= i).map(x => ([e, x])));


describe('should produce second when applying the diff of a,b', () => {
  for (let pair of pairs) {
    let [a, b] = clone([inputs[pair[0]], inputs[pair[1]]]);
    it(`${pair[0]} => ${pair[1]}`, () => {
      assert.deepEqual(apply(a, diff(a, b)), b);
    });
  }
});

describe('operation with nullish primitives', () => {
  for (let nullish of [null, undefined]) {
    for (let type of Object.keys(inputs)) {
      it(`should support operation between ${type} and ${nullish}`, () => {
        assert.deepEqual(apply(inputs[type], diff(inputs[type], nullish)), nullish);
      });
      it(`should support operation between ${nullish} and ${type}`, () => {
        assert.deepEqual(apply(nullish, diff(nullish, inputs[type])), inputs[type]);
      });
    }
  }
});
