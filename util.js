export const comparable = (a, b) => {
  if ((a instanceof Object) != (b instanceof Object))
    return false;
  if (Array.isArray(a) != Array.isArray(b))
    return false;
  return a instanceof Object;
}


