const types = require("./types");

module.exports = parse;

function parse(...args) {
  const obj = JSON.parse.apply(JSON, args);
  // We don't use the reviver option in `JSON.parse(obj, reviver)`
  // because it doesn't support `undefined` values.
  return modifier(obj);
}

function modifier(thing) {
  if (!(thing instanceof Object)) {
    return reviver(null, thing);
  }
  Object.entries(thing).forEach(([key, val]) => {
    thing[key] = modifier(val);
  });
  return thing;
}

function reviver(_, value) {
  for (const type of types) {
    if (type.match(value)) {
      return type.deserialize(value);
    }
  }
  return value;
}
