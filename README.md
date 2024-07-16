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

