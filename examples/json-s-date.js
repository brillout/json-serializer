const assert = require('assert');
const JSON = require('json-s');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON-S preserves Date
obj = JSON.parse(JSON.stringify(obj));
assert(obj.time.constructor===Date);
