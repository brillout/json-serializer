const assert = require('assert');

let obj = {
  time: new Date(),
};

assert(obj.time.constructor===Date);

// JSON converts dates to strings
obj = JSON.parse(JSON.stringify(obj));
assert(obj.time.constructor===String);
