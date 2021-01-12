module.exports = [
  {
    is: (val) => val === undefined,
    serialize: () => "!undefined",
    match: (str) => str === "!undefined",
    deserialize: () => undefined,
  },
  {
    is: (val) => val === Infinity,
    serialize: () => "!Infinity",
    match: (str) => str === "!Infinity",
    deserialize: () => Infinity,
  },
  {
    is: (val) => typeof val === "number" && isNaN(val),
    serialize: () => "!NaN",
    match: (str) => str === "!NaN",
    deserialize: () => NaN,
  },
  {
    is: (val) => val instanceof Date,
    serialize: (val) => "!Date:" + val.toISOString(),
    match: (str) => typeof str === "string" && str.startsWith("!Date:"),
    deserialize: (str) => new Date(str.slice("!Date:".length)),
  },
  {
    is: (val) => val instanceof RegExp,
    serialize: (val) => "!RegExp:" + val.toString(),
    match: (str) => typeof str === "string" && str.startsWith("!RegExp:"),
    deserialize: (str) => {
      str = str.slice("!RegExp:".length);
      // const args = str.match(/\/(.*?)\/([gimy])?$/);
      const args = str.match(/\/(.*)\/(.*)?/);
      return new RegExp(args[1], args[2] || "");
    },
  },
  // Avoid collisions with the special strings defined above
  {
    is: (val) => typeof val === "string" && val.startsWith("!"),
    serialize: (val) => "!" + val,
    match: (str) => typeof str === "string" && str.startsWith("!"),
    deserialize: (str) => str.slice(1),
  },
];
