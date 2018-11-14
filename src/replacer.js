const {typePrefix} = require('./common');

module.exports = replacer;

function replacer(key, value, ...ar) {
  if( value instanceof Date ) {
    return getTypePrefix("Date")+"|"+value.toISOString();
  }
  if( value instanceof RegExp ) {
    return getTypePrefix("RegExp")+"|"+value.toString();
  }
  if( value === undefined ) {
    return getTypePrefix("undefined");
  }
  if( typeof value === "number" && isNaN(value) ) {
    return getTypePrefix("NaN");
  }
  if( value===Infinity ) {
    return getTypePrefix("Infinity");
  }
  return value;
}

function getTypePrefix(typeName) {
  return typePrefix+"|"+typeName;
}
