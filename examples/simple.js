// npm install @brillout/json-s
const { parse } = require('@brillout/json-s/parse')
const { stringify } = require('@brillout/json-s/stringify')

const obj = {
  hello: 'from the future',
  time: new Date('2042-01-01'),
}

// Serialize with JSON-S
const obj_serialized = stringify(obj)

// Deserialize a JSON-S string
const obj_deserialized = parse(obj_serialized)
