// npm install @brillout/json-serializer
import { parse } from '@brillout/json-serializer/parse'
import { stringify } from '@brillout/json-serializer/stringify'

const obj = {
  hello: 'from the future',
  time: new Date('2042-01-01'),
}

// Serialize with @brillout/json-serializer
const obj_serialized = stringify(obj)

// Deserialize a @brillout/json-serializer string
const obj_deserialized = parse(obj_serialized)
