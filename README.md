# JSON-patcher

## Diff

Generate a series of instructions to get from an object to another object.


```Javascript

import { diff } from 'json-patcher';

let a = {
    'foo': 'bar'
}

let b = {
    'bar': 'baz'
}

console.log(diff(a, b));

/*
[
  [
    "DEL",
    [],
    "foo"
  ],
  [
    "SET",
    [
      "bar"
    ],
    "baz"
  ]
]
*/
```

### `stringDiff(a, b)`
Provides a more human readable format of the diff between a and b

```Javascript
import { stringDiff } from 'json-patcher';

let a = {
    'foo': 'bar'
}

let b = {
    'bar': 'baz'
}

console.log(stringDiff(a, b));

/*
DEL: $ - foo
SET: $.bar - baz
*/
```

## `apply(a, instructions)`
Takes a set of instructions and performs them on an object. Returns the new object.

```Javascript
import { apply } from 'json-patcher';

let a = {
    'foo': 'bar'
}

let instructions = [
    ['DEL', [], 'foo'],
    ['SET', ['bar'], 'baz']
];

let b = apply(a, instructions)

console.log(b);
/*
{
  "bar": "baz"
}
*/
```

## Nice things :)
These are just the things I remember, it's all just nice of course :P

### Noop
The output of `diff(a, a)` is always an empty set of instructions, which is a noop.

### Primitives
The [diff](#diff) and [apply](#apply) functions both work on primitives. Meaning it can generate instructions for converting an object to a primitive and apply those instructions to get a primitive.

All pairs of the following are tested together:
- empty object
- number
- string
- boolean
- simple non empty object (e.g. `{'foo': 'bar'}`
- deep object (e.g. `{'foo': {'bar': 'baz': 'bat'}}}`)
- array
- complex object (e.g. an object with multiple types as keys)
- null
- undefined

