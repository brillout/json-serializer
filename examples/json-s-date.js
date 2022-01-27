const assert = require('assert')
const JSON = require('@brillout/json-s')

let obj = {
  time: new Date('2042-01-01'),
}

// JSON-S preserves Date
assert(obj.time.constructor === Date)
obj = JSON.parse(JSON.stringify(obj))
assert(obj.time.constructor === Date)
assert(obj.time.getTime() === new Date('2042-01-01').getTime())
