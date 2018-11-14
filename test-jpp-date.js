const assert = require('assert');
const parse = require('./parse');
const stringify = require('./stringify');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON++ preserves Date
obj = parse(stringify(obj));
assert(obj.time.constructor===Date);
