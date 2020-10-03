const assert = require("assert");
const { parse, stringify } = require("../");

cannotSerializeFunctions1();
cannotSerializeFunctions2();
canSerializeUndefined();

console.log("All tests successfully passed");

function cannotSerializeFunctions1() {
  let err;
  try {
    console.log(stringify(function helloFn() {}));
  } catch (_err) {
    err = _err;
  }
  assert(err.message.includes("Cannot serialize function `helloFn`"));
}

function cannotSerializeFunctions2() {
  let err;
  try {
    console.log(stringify(() => {}));
  } catch (_err) {
    err = _err;
  }
  assert(err.message.includes("Cannot serialize function"));
}

function canSerializeUndefined() {
  assert(parse(stringify(undefined)) === undefined);
}
