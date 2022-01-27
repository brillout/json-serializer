export { types }

const types = [
  ts({
    is: (val) => val === undefined,
    match: (str) => str === '!undefined',
    serialize: () => '!undefined',
    deserialize: (): undefined => undefined,
  }),
  ts({
    is: (val) => val === Infinity,
    match: (str) => str === '!Infinity',
    serialize: () => '!Infinity',
    deserialize: (): typeof Infinity => Infinity,
  }),
  ts({
    is: (val) => val === -Infinity,
    match: (str) => str === '!-Infinity',
    serialize: () => '!-Infinity',
    deserialize: (): number => -Infinity,
  }),
  ts({
    is: (val) => typeof val === 'number' && isNaN(val),
    match: (str) => str === '!NaN',
    serialize: () => '!NaN',
    deserialize: () => NaN,
  }),
  ts<Date>({
    is: (val) => val instanceof Date,
    match: (str) => str.startsWith('!Date:'),
    serialize: (val) => '!Date:' + val.toISOString(),
    deserialize: (str) => new Date(str.slice('!Date:'.length)),
  }),
  ts<RegExp>({
    is: (val) => val instanceof RegExp,
    match: (str) => str.startsWith('!RegExp:'),
    serialize: (val) => '!RegExp:' + val.toString(),
    deserialize: (str) => {
      str = str.slice('!RegExp:'.length)
      // const args = str.match(/\/(.*?)\/([gimy])?$/);
      const args = str.match(/\/(.*)\/(.*)?/)
      return new RegExp(args![1], args![2] || '')
    },
  }),
  // Avoid collisions with the special strings defined above
  ts<string>({
    is: (val) => typeof val === 'string' && val.startsWith('!'),
    match: (str) => str.startsWith('!'),
    serialize: (val) => '!' + val,
    deserialize: (str) => str.slice(1),
  }),
] as const

type Type<T> = {
  is: (val: unknown) => asserts val is T
  match: (str: string) => boolean
  serialize: (val: T) => string
  deserialize: (str: string) => T
}

// Type check
function ts<T>(t: Type<T>) {
  return t
}
