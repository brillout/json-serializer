# JSON-S

<i>JSON-<b>S</b>erializer</i>

Same as JSON but with added support for:
 - `Date`
 - `undefined`
 - `NaN`
 - `Inifinity`
 - `RegExp`

JSON is a good serializer for JavaScript values but
is lacking some JavaScript types such as `Date`:

~~~js
!INLINE /examples/json-date.js --hide-source-path
~~~

Whereas with JSON-S:

~~~js
!INLINE /examples/json-s-date.js --hide-source-path
~~~

<br/>

#### Contents

 - [Usage](#usage)
 - [Full Example](#full-example)
 - [How it Works](#how-it-works)


<br/>

### Usage

~~~js
!INLINE /examples/simple.js --hide-source-path
~~~

The JSON-S functions `stringify` and `parse` have the exact same interface than `JSON.stringify` and `JSON.parse`.
So you can use all JSON's options.

<br/>

### Full Example

Example exposing all differences between JSON and JSON-S.

~~~js
!INLINE /examples/json-s.js
~~~

To run the example:

~~~shell
$ git clone git@github.com:brillout/json-s
$ cd json-s
$ npm install
$ npm run self-link
$ node ./examples/json-s.js
~~~

The `npm run self-link` is required to be able to self `require('@brillout/json-s')`.

<br/>

### How it Works

Let's see how JSON-S serializes an object:

~~~js
!INLINE /examples/inspect.js
~~~

JSON-S is based on JSON while using prefixed strings for unsupported types.
The string `json-s:tYpE` is used as a unique prefix to denote our special strings and make sure that regular strings are not converted.

JSON-S uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.
