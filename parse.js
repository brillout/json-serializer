const reviver = require('./reviver');

module.exports = parse;

function parse(...args) {
  args[1] = args[1] || reviver;
  return JSON.parse.apply(JSON, args);
}
