import assert from 'assert'
import { parse } from '@brillout/json-serializer/parse'
import { stringify } from '@brillout/json-serializer/stringify'

let time = new Date('2042-01-01')

// @brillout/json-serializer works on values directly
assert(time.constructor === Date)
time = parse(stringify(time))
assert(time.constructor === Date)
assert(time.getTime() === new Date('2042-01-01').getTime())
