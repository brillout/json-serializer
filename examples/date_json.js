const assert = require('assert')

let obj = {
  time: new Date('2042-01-01'),
}

// JSON converts dates to strings
assert(obj.time.constructor === Date)
obj = JSON.parse(JSON.stringify(obj))
assert(obj.time.constructor === String)
assert(obj.time === '2042-01-01T00:00:00.000Z')
