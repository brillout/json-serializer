const assert = require('assert')
const JSON = require('@brillout/json-s')

let time = new Date('2042-01-01')

// JSON-S works on values directly
assert(time.constructor === Date)
time = JSON.parse(JSON.stringify(time))
assert(time.constructor === Date)
assert(time.getTime() === new Date('2042-01-01').getTime())
