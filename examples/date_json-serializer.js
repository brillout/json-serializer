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
