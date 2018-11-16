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
!INLINE /examples/json-date.js --hide-source-path
~~~

Whereas JSON-S supports `Date`:

~~~js
!INLINE /examples/json-s-date.js --hide-source-path
~~~

<br/>

### Usage

~~~js
!INLINE /examples/simple.js --hide-source-path
~~~

The JSON-S functions `stringify` and `parse` have the exact same interface than `JSON.stringify` and `JSON.parse`.
So you can use all JSON's options.

<br/>

### Full example

Example exposing all differences between JSON and JSON-S.

~~~js
!INLINE /examples/json-s.js
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
!INLINE /examples/inspect.js
~~~

JSON-S is based on JSON while using prefixed strings for unsupported types.
The string `json-s:tYpE` is used as a unique prefix to denote our special strings and make sure that regular strings are not converted.

`json-s` uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.
