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
!INLINE /examples/date_json.js --hide-source-path
~~~

Whereas with `@brillout/json-serializer`:

~~~js
!INLINE /examples/date_json-serializer.js --hide-source-path
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

<br/>

### Full Example

Example exposing all differences between JSON and `@brillout/json-serializer`.

~~~js
!INLINE /examples/json-serializer.js
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
!INLINE /examples/inspect.js
~~~

`@brillout/json-serializer` is based on JSON while using prefixed strings for unsupported types.

`@brillout/json-serializer` uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.
