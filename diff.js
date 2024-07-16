import { shouldSet, jsonPath } from './util.js';

// Assumes both are objects
export const diff = (a, b) => {
  if (shouldSet(a,b))
    return [["SET", [], b]]
  if (!(a instanceof Object))
    return [];
  let instructions = []
  Object.keys(a)
    .forEach(key => {
      if (!(key in b))
        return instructions.push(["DEL", [], key])
      instructions = instructions.concat(diff(a[key], b[key]))
                                 .map(([op, path, val]) => ([op, [key, ...path], val]));
    });
  Object.keys(b)
    .filter(k => !(k in a))
    .forEach(k => {
      instructions.push(['SET', [k], b[k]])
    });
  return instructions;
}

export const stringDiff = (a, b) =>
  diff(a, b)
    .map(([op, path, val]) =>
      `${op}: ${jsonPath(path)} - ${val}`)
    .join('\n');

