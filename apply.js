import jsonpath from 'jsonpath';

import { jsonPath } from './util.js';

export const apply = (input, instructions) => {
  return instructions.reduce((acc, [op, path, val]) => {
    if (op === 'SET') {
      if (path.length == 0) {
        return val;
      }
      jsonpath.value(acc, jsonPath(path), val); 
    }
    if (op === 'DEL')
      delete jsonpath.value(acc, jsonPath(path))[val];
    return acc;
  }, input);
}
