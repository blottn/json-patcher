import { diff } from '../diff.js';

import assert from 'assert';

describe('diff.diff(a,b)', () => {
  it('should create no diff between an object and itself', () => {
    assert.deepEqual(diff({}, {}),
      []);
  });
  it('should create a set instruction between 2 non comparable objects', () => {
    assert.deepEqual(diff(123, {}),
      [["SET", [], {}]]);
  });
  it('should create a set instruction for a non matching subkey between objects', () => {
    assert.deepEqual(diff({'foo':'bar'}, {'foo': 'wrong'}),
      [["SET", ["foo"], "wrong"]]);
  });
  it('should create a set instruction for a non matching subkey between objects', () => {
    assert.deepEqual(diff({'foo':'bar'}, {'foo': 'wrong'}),
      [["SET", ["foo"], "wrong"]]);
  });
  it('should create a set instruction for a missing key', () => {
    assert.deepEqual(diff({}, {'foo': 'missing'}),
      [["SET", ["foo"], "missing"]]);
  });
  it('should create a delete instruction for a deleted key', () => {
    assert.deepEqual(diff({'foo': 'bar'}, {}),
      [["DEL", ["foo"]]]);
  });
});

