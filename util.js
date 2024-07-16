export const shouldSet = (a, b) => {
  if (Array.isArray(a) != Array.isArray(b))
    return true;
  if ((a instanceof Object) != (b instanceof Object))
    return true;
  if (a instanceof Object)
    return false; // Both are objects
  if (a !== b)
    return true; // Both are primitives and are not equal
  return false;
}

export const jsonPath = (listPath) => `$${listPath.map(p => `.${p}`).join('')}`;

export const getAt = (obj, path) => {
  if (path.length == 0)
    return obj; // We don't want to go deeper
  if (!(obj instanceof Object) || Array.isArray(obj))
    return obj; // We can't go deeper, ideally shouldn't happen
  return getAt(obj[path[0]], path.slice(1));
}

export const setAt = (obj, path, val) => {
  if (path.length == 0)
    return val;
  return {...obj, [path[0]]: setAt(obj[path[0]] ?? {}, path.slice(1), val)}
}
