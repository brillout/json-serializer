const replacer = require("./replacer");

module.exports = stringify;

function stringify(...args) {
  args[1] = args[1] || replacer;
  const toJSON_org = Date.prototype.toJSON;
  Date.prototype.toJSON = function (key) {
    return replacer(key, this);
  };
  Function.prototype.toJSON = function (key, val) {
    let errMsg = "[@brillout/json-s] Cannot serialize function";
    if (this.name) {
      errMsg += " `" + this.name + "`";
    }
    throw new Error(errMsg);
  };
  let result;
  try {
    result = JSON.stringify.apply(JSON, args);
  } finally {
    Date.prototype.toJSON = toJSON_org;
  }
  return result;
}
