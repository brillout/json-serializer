const reviver = require('./reviver');

module.exports = parse;

function parse(...args) {
  const obj = JSON.parse.apply(JSON, args);
  // We don't use the reviver option in `JSON.parse(obj, reviver)`
  // because we want the reviver to be able to change a value to undefined
  modifier(obj, reviver);
  return obj;
}

function modifier(obj, reviver) {
  if( ! (obj instanceof Object) ) {
    return obj;
  }
  Object.entries(obj)
  .forEach(([key, val]) => {
    obj[key] = reviver(key, val);
    modifier(obj[key]);
  });
}
