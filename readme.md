<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).






-->
# `@brillout/json-serializer`

Same as JSON but with added support for:
 - `Date`
 - `undefined`
 - `Set`
 - `Map`
 - `BigInt`
 - `RegExp`
 - `NaN`
 - `Infinity`

JSON is a good serializer for JavaScript values but
is lacking some JavaScript types such as `Date`:

~~~js
const assert = require('assert')

let obj = {
  time: new Date('2042-01-01')
}

// JSON converts dates to strings
assert(obj.time.constructor === Date)
obj = JSON.parse(JSON.stringify(obj))
assert(obj.time.constructor === String)
assert(obj.time === '2042-01-01T00:00:00.000Z')
~~~

Whereas with `@brillout/json-serializer`:

~~~js
const assert = require('assert')
const { parse } = require('@brillout/json-serializer/parse')
const { stringify } = require('@brillout/json-serializer/stringify')

let obj = {
  time: new Date('2042-01-01')
}

// `@brillout/json-serializer` preserves Date
assert(obj.time.constructor === Date)
obj = parse(stringify(obj))
assert(obj.time.constructor === Date)
assert(obj.time.getTime() === new Date('2042-01-01').getTime())
~~~

<br/>

#### Contents

 - [Usage](#usage)
 - [Full Example](#full-example)
 - [How it Works](#how-it-works)


<br/>

### Usage

~~~js
// npm install @brillout/json-serializer
const { parse } = require('@brillout/json-serializer/parse')
const { stringify } = require('@brillout/json-serializer/stringify')

const obj = {
  hello: 'from the future',
  time: new Date('2042-01-01')
}

// Serialize with @brillout/json-serializer
const obj_serialized = stringify(obj)

// Deserialize a @brillout/json-serializer string
const obj_deserialized = parse(obj_serialized)
~~~

<br/>

### Full Example

Example exposing all differences between JSON and `@brillout/json-serializer`.

~~~js
// /examples/json-serializer.js

const assert = require('assert')

const { parse } = require('@brillout/json-serializer/parse')
const { stringify } = require('@brillout/json-serializer/stringify')

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g
}

// All of `obj` can be serialized with @brillout/json-serializer
const obj2 = parse(stringify(obj))
assert(obj2.date.getTime() === obj.date.getTime())
assert(obj2.undefined === undefined && 'undefined' in obj2)
assert(isNaN(obj2.NaN))
assert(obj2.Infinity === Infinity)
assert(obj2.regexp.toString() === obj.regexp.toString())

// JSON cannot serialize any of `obj`
const obj3 = JSON.parse(JSON.stringify(obj))
// JSON converts dates to strings
assert(obj3.constructor !== Date)
// JSON removes properties with a value of `undefined`
assert(!('undefined' in obj3))
// JSON converts `NaN` to `null`
assert(obj3.NaN === null)
// JSON converts `Infinity` to `null`
assert(obj3.Infinity === null)
// JSON converts RegExp to an empty object
assert(obj3.regexp.constructor === Object && Object.keys(obj3.regexp).length === 0)
~~~

To run the example:

~~~shell
$ git clone git@github.com:brillout/json-serializer
$ cd json-serializer
$ npm install
$ npm run self-link
$ node ./examples/json-serializer.js
~~~

The `npm run self-link` is required to be able to self `require('@brillout/json-serializer')`.

<br/>

### How it Works

Let's see how `@brillout/json-serializer` serializes an object:

~~~js
// /examples/inspect.js

const { stringify } = require('@brillout/json-serializer/stringify')

const obj = {
  date: new Date(),
  undefined: undefined,
  collision: '!undefined',
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g
}

console.log(stringify(obj, undefined, 2))
// Prints:
/*
{
  "date": "!Date:2021-01-12T22:15:56.319Z",
  "undefined": "!undefined",
  "collision": "!!undefined"
  "NaN": "!NaN",
  "Infinity": "!Infinity",
  "regexp": "!RegExp:/^\\d+$/g"
}
*/
~~~

`@brillout/json-serializer` is based on JSON while using prefixed strings for unsupported types.

`@brillout/json-serializer` uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.

<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).






-->
