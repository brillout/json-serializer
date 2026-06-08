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
 - [`htmlScriptSafe`](#htmlscriptsafe)
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

### `htmlScriptSafe`

The serialized output is made safe to embed inside an HTML `<script>` — including `<script type="application/json">` — **by default**.

It escapes:
 - `<`, so a value containing `</script>` can't break out of the `<script>` tag (which would otherwise be an XSS vector — the HTML parser ends *any* `<script>` at `</script>`, regardless of the `type` attribute).
 - `/`, so search engines don't crawl URLs contained in the data.

It's transparent: `parse()` decodes both back, so only the serialized string changes, never the parsed value.

To opt out:

~~~js
stringify(value, { htmlScriptSafe: false })                 // don't escape anything
stringify(value, { htmlScriptSafe: { escapeURLs: false } }) // keep escaping `<`, but not `/`
~~~

See [#19](https://github.com/brillout/json-serializer/pull/19) for details.

<br/>

### How it Works

Let's see how `@brillout/json-serializer` serializes an object:

~~~js
!INLINE /examples/inspect.js
~~~

`@brillout/json-serializer` is based on JSON while using prefixed strings for unsupported types.

`@brillout/json-serializer` uses the native `JSON.parse` and `JSON.stringify` functions while modifying the serialization of unsupported types.
