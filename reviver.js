const {typePrefix} = require('./common');
const assert = require('reassert');

module.exports = reviver;

function reviver(key, value) {
  const {type, val} = getTypePrefix(value);
  if( ! type ) {
    return value;
  }
  if( type==="date" ) {
    return new Date(val);
  }
  if( type==="undefined" ) {
    return undefined;
  }
  assert.usage(false, "unknown type `"+type+"`");
}

function getTypePrefix(value) {
  if( !value || value.constructor!==String || ! value.startsWith(typePrefix+'|') ) {
    return {};
  }

  const [prefix, type, ...valArray] = value.split('|');
  assert.internal(prefix===typePrefix);
  const val = valArray.join('|');

  return {type, val};
}
