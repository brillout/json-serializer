# JSON++

Same as JSON but with added support for:
 - `Date`
 - `undefined`
 - `NaN`
 - `Inifinity`
 - `RegExp`

JSON is great but is lacking for some (crucial) JavaScript types such as `Date`:

~~~js
!INLINE /examples/json-date.js --hide-source-path
~~~

Whereas JSON++ supports `Date`:

~~~js
!INLINE /examples/jpp-date.js --hide-source-path
~~~

### Usage

~~~js
!INLINE /examples/simple.js --hide-source-path
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
!INLINE /examples/jpp.js
~~~

### How it works

Let's see how JSON++ serializes an object:

~~~js
!INLINE /examples/inspect.js
~~~

JSON++ is based on JSON while using prefixed strings for unsupported types.
The string `@brillout/jpp:tYpE` is used as a unique prefix to denote our special strings and make sure that regular strings are not converted.

JSON++ uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization for the unsupported types.
