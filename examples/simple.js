// npm install @brillout/jpp
const parse = require('@brillout/jpp/parse');
const stringify = require('@brillout/jpp/stringify');

const obj = {
  hello: 'from the future',
  time: new Date('2042-01-01'),
};

// Serialize with JSON++
const obj_serialized = stringify(obj);

// Deserialize a JSON++ string
const obj_deserialized = parse(obj_serialized);
