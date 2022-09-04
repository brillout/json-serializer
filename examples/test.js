const util = require('util')
const isEqual = require('lodash.isequal')
const assert = require('assert')

const { parse } = require('@brillout/json-serializer/parse')
const { stringify } = require('@brillout/json-serializer/stringify')

const original = {
  // types not supported by JSON
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+.*(a|b)$/gi,

  // types supported by JSON
  sub: {
    obj: {
      null: null,
      false: false,
      true: true,
      arr: [1, 'two', undefined, null, { subi: [1] }],
      str: 'A string',
      n: 1337
    }
  }
}

const serialized = stringify(original, { space: 2 })
const deserialized = parse(serialized)

assert(isEqual(original, deserialized))

console.log('JSON serialized->deserialized.')
console.log('(Note how we loose many values.)')
console.log(JSON.parse(JSON.stringify(original)))
console.log()

console.log('@brillout/json-serializer serialized.')
console.log(serialized)
console.log()

console.log('Original object.')
logObj(original)
console.log()

console.log('@brillout/json-serializer serialized->deserialized.')
console.log('(Note that all values are preserved and that this object is a clone of the original object.)')
logObj(deserialized)

function logObj(obj) {
  console.log(util.inspect(obj, { depth: Infinity, colors: true }))
}
