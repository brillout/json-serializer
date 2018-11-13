/*
JSON.stringify({
  a: '1',
  b: 2,
  c: new Date(),
  d: {e: 12},
  f: undefined,
  l: 'hm',
}, function(...args) {
  console.log(args);
  return args[1];
});
*/

//*
const parse = require('./parse');
const stringify = require('./stringify');
const assert = require('reassert');

const date = new Date();
const notDefined = undefined;

const objSerialized = (
  stringify({
    notDefined,
    date,
  })
);

const obj = parse(
  objSerialized
);

console.log(objSerialized);
console.log(obj);
assert(obj.date.constructor===Date);
assert(obj.date.getTime()===date.getTime());

assert(obj.notDefined===undefined);
//*/





var myObject = {
  num: 50,
  str: 'A string here',
  today: new Date(),
  ar: ['one', 'two', 'three'],
  obj: {
    min: 2,
    max: 1000,
    bool: true,
    o: null,
    val: undefined,
    re: /^\d+$/,
    fn: function(val) {
      // code here
    }
  }
}
