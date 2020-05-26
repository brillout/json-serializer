const reviver = require("./reviver");

module.exports = parse;

function parse(...args) {
  const obj = JSON.parse.apply(JSON, args);
  // We don't use the reviver option in `JSON.parse(obj, reviver)`
  // because we want the reviver to be able to change a value to undefined
  return modifier(obj);
}

function modifier(obj) {
  if (!(obj instanceof Object)) {
    return reviver("__unkown-key__", obj);
  }
  Object.entries(obj).forEach(([key, val]) => {
    obj[key] = modifier(val);
  });
  return obj;
}
