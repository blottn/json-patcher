export const shouldSet = (a, b) => {
  if (Array.isArray(a) != Array.isArray(b))
    return true;
  if ((a instanceof Object) != (b instanceof Object))
    return true;
  if (a instanceof Object)
    return false;
  if (a !== b)
    return true;
  return false;
}

export const comparable = shouldSet;
