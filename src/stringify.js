const replacer = require('./replacer');
//const assert = require('reassert');

module.exports = stringify;

function stringify(...args) {
  args[1] = args[1] || replacer;
  const toJSON_org = Date.prototype.toJSON;
  Date.prototype.toJSON = function(key, val){ return replacer(key, this); };
  const result = JSON.stringify.apply(JSON, args);
  Date.prototype.toJSON = toJSON_org;
  return result;
}

