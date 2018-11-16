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
# JSON-S

<i>JSON-<b>S</b>erializer</i>

Same as JSON but with added support for:
 - `Date`
 - `undefined`
 - `NaN`
 - `Inifinity`
 - `RegExp`

JSON is a great serializer.
But it is lacking for some (crucial) JavaScript types such as `Date`:

~~~js
const assert = require('assert');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON converts dates to strings
obj = JSON.parse(JSON.stringify(obj));
assert(obj.time.constructor===String);
~~~

Whereas JSON-S supports `Date`:

~~~js
const assert = require('assert');
const JSON = require('json-s');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON-S preserves Date
obj = JSON.parse(JSON.stringify(obj));
assert(obj.time.constructor===Date);
~~~

<br/>

### Usage

~~~js
// npm install json-s
const parse = require('json-s/parse');
const stringify = require('json-s/stringify');

const obj = {
  hello: 'from the future',
  time: new Date('2042-01-01'),
};

// Serialize with JSON-S
const obj_serialized = stringify(obj);

// Deserialize a JSON-S string
const obj_deserialized = parse(obj_serialized);
~~~

The JSON-S functions `stringify` and `parse` have the exact same interface than `JSON.stringify` and `JSON.parse`.
So you can use all JSON's options.

<br/>

### Full example

Example exposing all differences between JSON and JSON-S.

~~~js
// /examples/json-s.js

const assert = require('assert');

const parse = require('json-s/parse');
const stringify = require('json-s/stringify');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// All of `obj` can be serialized with JSON-S
const obj2 = parse(stringify(obj))
assert(obj2.date.getTime()===obj.date.getTime());
assert(obj2.undefined===undefined && 'undefined' in obj2);
assert(isNaN(obj2.NaN));
assert(obj2.Infinity===Infinity);
assert(obj2.regexp.toString()===obj.regexp.toString());

// JSON cannot serialize any of `obj`
const obj3 = JSON.parse(JSON.stringify(obj))
// JSON converts dates to strings
assert(obj3.constructor!==Date);
// JSON removes properties with a value of `undefined`
assert(!('undefined' in obj3));
// JSON converts `NaN` to `null`
assert(obj3.NaN===null);
// JSON converts `Infinity` to `null`
assert(obj3.Infinity===null);
// JSON converts RegExp to an empty object
assert(obj3.regexp.constructor===Object && Object.keys(obj3.regexp).length===0);
~~~

To run the example:

~~~shell
$ git clone git@github.com:brillout/json-s.git
$ cd json-s
$ npm install
$ npm run link
$ node ./examples/json-s.js
~~~

The `npm run link` is required to be able to self `require('json-s')`.

<br/>

### How it works

Let's see how JSON-S serializes an object:

~~~js
// /examples/inspect.js

const JSON = require('json-s');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// We use the second argument `2` to have a prettified JSON-S string.
// (Same as in JSON's `JSON.stringify(obj, undefined, 2)`).
console.log(JSON.stringify(obj, undefined, 2));
// Prints:
/*
{
  "date": "json-s:tYpE|Date|2018-11-14T17:39:09.245Z",
  "undefined": "json-s:tYpE|undefined",
  "NaN": "json-s:tYpE|NaN",
  "Infinity": "json-s:tYpE|Infinity",
  "regexp": "json-s:tYpE|RegExp|/^\\d+$/g"
}
*/
~~~

JSON-S is based on JSON while using prefixed strings for unsupported types.
The string `json-s:tYpE` is used as a unique prefix to denote our special strings and make sure that regular strings are not converted.

`json-s` uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.

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
