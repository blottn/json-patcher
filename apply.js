import { jsonPath, getAt, setAt } from './util.js';

export const apply = (input, instructions) => {
  return instructions.reduce((acc, [op, path, val]) => {
    if (op === 'SET') {
      if (path.length == 0) {
        return val;
      }
      return setAt(acc, path, val);
    }
    if (op === 'DEL')
      delete getAt(acc, path)[val];
    return acc;
  }, input);
}
