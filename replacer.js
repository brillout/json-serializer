const {typePrefix} = require('./common');

module.exports = replacer;

function replacer(key, value, ...ar) {
//console.log(key, value, ar);
  if( value instanceof Date ) {
    return getTypePrefix("date")+value.toISOString();
  }
  if( value === undefined ) {
    return getTypePrefix("undefined");
  }
  return value;
}

function getTypePrefix(typeName) {
  return typePrefix+"|"+typeName+"|";
}
