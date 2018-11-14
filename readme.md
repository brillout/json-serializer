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

Same as JSON but with added support for:
 - `Date`
 - `undefined`
 - `NaN`
 - `Inifinity`
 - `RegExp`

JSON is great but is lacking for some (crucial) JavaScript types such as `Date`:

~~~js
const assert = require('assert');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON converts Date to String
obj = JSON.parse(JSON.stringify(obj));
assert(obj.time.constructor===String);
~~~

Whereas JSON++ supports `Date`:

~~~js
const assert = require('assert');
const parse = require('@brillout/jpp/parse');
const stringify = require('@brillout/jpp/stringify');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON++ preserves Date
obj = parse(stringify(obj));
assert(obj.time.constructor===Date);
~~~

### Usage

~~~js
// npm install @brillout/jpp
const parse = require('@brillout/jpp/parse');
const stringify = require('@brillout/jpp/stringify');

const obj = {
  hello: 'from the future',
  time: new Date('2042-01-01'),
};

// Serialize with JSON++
const obj_serialized = stringify(obj);

// Deserialize a JSON++ string
const obj_deserialized = parse(obj_serialized);
~~~

Because JSON++ supports `Date`, both `obj` and `obj_deserialized` are equal.

JSON++ has the exact same interface than `JSON`.
So you can use all of JSON's options.

### Full example

Example exposing all differences between JSON and JSON++.

To run the example:

~~~shell
$ git clone git@github.com:brillout/jpp.git
$ cd jpp
$ npm install
$ npm run link
$ node ./examples/jpp.js
~~~

The `npm run link` is required to be able to self `require('@brillout/jpp')`.

~~~js
// /examples/jpp.js

const assert = require('assert');

const parse = require('@brillout/jpp/parse');
const stringify = require('@brillout/jpp/stringify');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// All of `obj` can be serialized with JSON++
const obj_jpp = parse(stringify(obj))
assert(obj_jpp.date.getTime()===obj.date.getTime());
assert(obj_jpp.undefined===undefined && 'undefined' in obj_jpp);
assert(isNaN(obj_jpp.NaN));
assert(obj_jpp.Infinity===Infinity);
assert(obj_jpp.regexp.toString()===obj.regexp.toString());

// JSON cannot serialize any of `obj`
const obj_json = JSON.parse(JSON.stringify(obj))
// JSON converts dates to strings
assert(obj_json.constructor!==Date);
// JSON removes properties with a value of `undefined`
assert(!('undefined' in obj_json));
// JSON converts `NaN` to `null`
assert(obj_json.NaN===null);
// JSON converts `Infinity` to `null`
assert(obj_json.Infinity===null);
// JSON converts RegExp to an empty object
assert(obj_json.regexp.constructor===Object && Object.keys(obj_json.regexp).length===0);
~~~

### How it works

Let's see how JSON++ serializes an object:

~~~js
// /examples/inspect.js

const stringify = require('@brillout/jpp/stringify');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// We use the second argument `2` to have a prettified JSON++ string.
// (Same as in `JSON.stringify(obj, undefined, 2)`).
console.log(stringify(obj, undefined, 2));
// Prints:
/*
{
  "date": "@brillout/jpp:tYpE|Date|2018-11-14T17:39:09.245Z",
  "undefined": "@brillout/jpp:tYpE|undefined",
  "NaN": "@brillout/jpp:tYpE|NaN",
  "Infinity": "@brillout/jpp:tYpE|Infinity",
  "regexp": "@brillout/jpp:tYpE|RegExp|/^\\d+$/g"
}
*/
~~~

JSON++ is based on JSON while using prefixed strings for unsupported types.
The string `@brillout/jpp:tYpE` is used as a unique prefix to denote our special strings and make sure that regular strings are not converted.

JSON++ uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization for the unsupported types.

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
