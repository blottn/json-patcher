import { shouldSet } from './util.js';

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

export const stringDiff = (a, b) => {
  return listDiff(a, b).join('\n');
}

export const listDiff = (a, b) => {
  let insts = diff(a, b);
  return insts.map(([op, path, val]) => [op, `$${path.map(p => `.${p}`).join('')}`, val]);
}
