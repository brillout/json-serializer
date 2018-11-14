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


<br/>
### Usage

~~~js
!INLINE /examples/simple.js --hide-source-path
~~~

JSON++'s `stringify` and `parse` have the exact same interface than `JSON.stringify` and `JSON.parse`.
So you can use all JSON's options.


<br/>
### Full example

Example exposing all differences between JSON and JSON++.

~~~js
!INLINE /examples/jpp.js
~~~

To run the example:

~~~shell
$ git clone git@github.com:brillout/jpp.git
$ cd jpp
$ npm install
$ npm run link
$ node ./examples/jpp.js
~~~

The `npm run link` is required to be able to self `require('@brillout/jpp')`.


<br/>
### How it works

Let's see how JSON++ serializes an object:

~~~js
!INLINE /examples/inspect.js
~~~

JSON++ is based on JSON while using prefixed strings for unsupported types.
The string `@brillout/jpp:tYpE` is used as a unique prefix to denote our special strings and make sure that regular strings are not converted.

`@brillout/jpp` uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.
