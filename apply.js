import jsonpath from 'jsonpath';

export const apply = (input, instructions) => {
  return instructions.reduce((acc, [op, path, val]) => {
    if (op === 'SET') {
      if (path === '$') {
        return val;
      }
      jsonpath.value(acc, path, val); 
    }
    if (op === 'DEL')
      delete jsonpath.value(acc, path)[val];
    return acc;
  }, input);
}

let instructions = `SET $.store {"foo":"WOW"}
SET $.store.bar []
SET $.store.bar.0 1.234`.split('\n').map(l => l.split(' '));

// console.log(apply({}, instructions));
