<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.






-->
# JSON++

Same as JSON but with support for:
 - `Date`
 - `undefined`
 - `NaN`
 - `Inifinity`
 - `RegExp`

JSON is great but is lacking for certain JavaScript types such as `Date`:

~~~js
// /test-json-date.js

const assert = require('assert');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON converts Date to String
obj = JSON.parse(JSON.stringify(obj));
assert(obj.time.constructor===String);
~~~

JSON++ supports `Date`:

~~~js
// /test-jpp-date.js

const assert = require('assert');
const parse = require('./parse');
const stringify = require('./stringify');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON++ preserves Date
obj = parse(stringify(obj));
assert(obj.time.constructor===Date);
~~~

Full example:

~~~js
// /test.js

const util = require('util');
const isEqual = require('lodash.isequal');
const assert = require('assert');

const parse = require('./parse');
const stringify = require('./stringify');

const original = {
  // types not supported by JSON
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regex: /^\d+$/gi,

  // types supported by JSON
  sub: {obj: {
    null: null,
    false: false,
    true: true,
    arr: [1, 'two', undefined, null, {subi: [1]}],
    str: 'A string',
    n: 1337,
  }},
};

const serialized = stringify(original, null, 2);
const deserialized = parse(serialized);

assert(isEqual(original, deserialized));

console.log('Serialized:');
console.log(serialized);
console.log();
console.log('Original:');
logObj(original);
console.log();
console.log('Deserialized:');
logObj(deserialized);

function logObj(obj) {
  console.log(util.inspect(obj, {depth: Infinity, colors: true}));
}
~~~

<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/readme.template.md` instead.






-->
