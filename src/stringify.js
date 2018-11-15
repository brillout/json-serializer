const replacer = require('./replacer');

module.exports = stringify;

function stringify(...args) {
  args[1] = args[1] || replacer;
  const toJSON_org = Date.prototype.toJSON;
  Date.prototype.toJSON = function(key, val){ return replacer(key, this); };
  let result;
  try {
    result = JSON.stringify.apply(JSON, args);
  } finally {
    Date.prototype.toJSON = toJSON_org;
  }
  return result;
}
