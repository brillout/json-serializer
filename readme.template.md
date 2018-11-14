# JSON++

Same as JSON but with support for:
 - `Date`
 - `undefined`
 - `NaN`
 - `Inifinity`
 - `RegExp`

JSON is great but is lacking for certain JavaScript types such as `Date`:

~~~js
!INLINE /test-json-date.json
~~~

JSON++ supports `Date`:

~~~js
!INLINE /test-jpp-date.json
~~~

Full example:

~~~js
!INLINE /test.json
~~~
