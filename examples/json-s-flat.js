const assert = require('assert')
const { parse } = require('@brillout/json-s/parse')
const { stringify } = require('@brillout/json-s/stringify')

let time = new Date('2042-01-01')

// JSON-S works on values directly
assert(time.constructor === Date)
time = parse(stringify(time))
assert(time.constructor === Date)
assert(time.getTime() === new Date('2042-01-01').getTime())
