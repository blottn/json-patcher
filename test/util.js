import assert from 'assert';

import { comparable } from '../util.js';

const arrs = [[456], [123]];
const objs = [{'foo': 'bar'}, {'a': 'b'}];

describe('utils.comparable(a,b)', () => {
  it('should declare number & number comparable', () => {
    assert.equal(comparable(123, 456), true);
  });
  it('should declare number and equal number comparable', () => {
    assert.equal(comparable(123, 123), false);
  });
  it('should declare number and equal string comparable', () => {
    assert.equal(comparable('foobarbaz', 'foobarbaz'), false);
  });
  it('should declare string & string comparable', () => {
    assert.equal(comparable("bar", "foo"), true);
  });

  it('should declare object & object comparable', () => {
    assert.equal(comparable(objs[0], objs[1]), false);
  });

  it('should declare array & array comparable', () => {
    assert.equal(comparable(arrs[0], arrs[1]), false);
  });

  it('should declare array & object NOT comparable', () => {
    assert.equal(comparable(arrs[0], objs[0]), true);
  });

  it('should declare array & primitive NOT comparable', () => {
    assert.equal(comparable(arrs[0], "asdf"), true);
  });

  it('should declare object & primitive NOT comparable', () => {
    assert.equal(comparable(objs[0], "asdf"), true);
  });
});
