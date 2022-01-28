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
  ts<Date, any>({
    is: (val) => val instanceof Date,
    match: (str) => str.startsWith('!Date:'),
    serialize: (val) => '!Date:' + val.toISOString(),
    deserialize: (str) => new Date(str.slice('!Date:'.length)),
  }),
  ts<RegExp, any>({
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
  ts<Map<any, any>, any[]>({
    is: (val) => val instanceof Map,
    match: (str) => str.startsWith('!Map:'),
    serialize: (val, serializer) => '!Map:' + serializer(Array.from(val.entries())),
    deserialize: (str, deserializer) => new Map(deserializer(str.slice('!Map:'.length))),
  }),
  ts<Set<unknown>, unknown[]>({
    is: (val) => val instanceof Set,
    match: (str) => str.startsWith('!Set:'),
    serialize: (val, serializer) => '!Set:' + serializer(Array.from(val.values())),
    deserialize: (str, deserializer) => new Set(deserializer(str.slice('!Set:'.length))),
  }),
  // Avoid collisions with the special strings defined above
  ts<string, any>({
    is: (val) => typeof val === 'string' && val.startsWith('!'),
    match: (str) => str.startsWith('!'),
    serialize: (val) => '!' + val,
    deserialize: (str) => str.slice(1),
  }),
] as const

type Type<T, IntermediateType> = {
  is: (val: unknown) => asserts val is T
  match: (str: string) => boolean
  serialize: (val: T, serializer: (val: IntermediateType) => string) => string
  deserialize: (str: string, deserializer: (str: string) => IntermediateType) => T
}

// Type check
function ts<T, IntermediateType>(t: Type<T, IntermediateType>) {
  return t
}
