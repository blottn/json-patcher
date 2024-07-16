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

export const comparable = shouldSet;

export const jsonPath = (listPath) => `$${listPath.map(p => `.${p}`).join('')}`;
