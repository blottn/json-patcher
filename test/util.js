import assert from 'assert';

import { comparable } from '../util.js';

const arrs = [[456], [123]];
const objs = [{'foo': 'bar'}, {'a': 'b'}];

describe('utils.comparable(a,b)', () => {
  it('should declare number & number comparable', () => {
    assert.equal(comparable(123, 456), false);
  });

  it('should declare string & string comparable', () => {
    assert.equal(comparable("bar", "foo"), false);
  });

  it('should declare object & object comparable', () => {
    assert.equal(comparable(objs[0], objs[1]), true);
  });

  it('should declare array & array comparable', () => {
    assert.equal(comparable(arrs[0], arrs[1]), true);
  });

  it('should declare array & object NOT comparable', () => {
    assert.equal(comparable(arrs[0], objs[0]), false);
  });

  it('should declare array & primitive NOT comparable', () => {
    assert.equal(comparable(arrs[0], "asdf"), false);
  });

  it('should declare object & primitive NOT comparable', () => {
    assert.equal(comparable(objs[0], "asdf"), false);
  });
});
