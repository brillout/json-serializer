const {typePrefix} = require('./common');
// const assert = require('@brillout/assert');

module.exports = reviver;

function reviver(key, value) {
  const {type, val} = getTypePrefix(value);
  if( ! type ) {
    return value;
  }
  if( type==="Date" ) {
    return new Date(val);
  }
  if( type==="RegExp" ) {
 // const args = val.match(/\/(.*?)\/([gimy])?$/);
    const args = val.match(/\/(.*)\/(.*)?/);
    return new RegExp(args[1], args[2]||"");
  }
  if( type==="undefined" ) {
    return undefined;
  }
  if( type==="NaN" ) {
    return NaN;
  }
  if( type==="Infinity" ) {
    return Infinity;
  }
  // TODO
  //  - re-use this `assert.internal`
  //  - but make sure to avoid cyclic dependency: JSON-S => @brillout/assert => JSON-S
  //  - check if Node.js support of ES modules is widespread nowadays, if yes -> use ES modules instead of CJS.
  // assert.usage(false, "[@brillout/json-s]: Unknown type `"+type+"`.");
}

function getTypePrefix(value) {
  if( !value || value.constructor!==String || ! value.startsWith(typePrefix+'|') ) {
    return {};
  }

  const [prefix, type, ...valArray] = value.split('|');

  // TODO
  //  - re-use this `assert.internal`
  //  - but make sure to avoid cyclic dependency: JSON-S => @brillout/assert => JSON-S
  //  - check if Node.js support of ES modules is widespread nowadays, if yes -> use ES modules instead of CJS.
  // assert.internal(prefix===typePrefix);

  const val = valArray.join('|');

  return {type, val};
}
