const assert = require('assert')
const { parse } = require('@brillout/json-s/parse')
const { stringify } = require('@brillout/json-s/stringify')

let obj = {
  time: new Date('2042-01-01')
}

// JSON-S preserves Date
assert(obj.time.constructor === Date)
obj = parse(stringify(obj))
assert(obj.time.constructor === Date)
assert(obj.time.getTime() === new Date('2042-01-01').getTime())
