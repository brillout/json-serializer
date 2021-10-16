import { types } from './types'

export { stringify }

function stringify(...args: Parameters<typeof JSON.stringify>): string {
  // @ts-ignore
  args[1] = args[1] || replacer;

  const toJSON_date = Date.prototype.toJSON;
  /*
  Date.prototype.toJSON = function (key) {
    return replacer(key, this);
  };
  */

  // @ts-ignore
  const toJSON_function = Function.prototype.toJSON;
  // @ts-ignore
  Function.prototype.toJSON = function () {
    let errMsg = "[@brillout/json-s] Cannot serialize function";
    if (this.name) {
      errMsg += " `" + this.name + "`";
    }
    throw new Error(errMsg);
  };

  let result: string;
  try {
    result = JSON.stringify.apply(JSON, args);
  } finally {
    Date.prototype.toJSON = toJSON_date;
    // @ts-ignore
    Function.prototype.toJSON = toJSON_function;
  }
  return result;
}

function replacer(key, valueSerialized) {
  const valueOriginal = this[key];
  for (const type of types.slice().reverse()) {
    //for (const type of types) {
    if (type.is(this[key])) {
      return type.serialize(valueOriginal);
    }
  }
  return valueSerialized;
}
