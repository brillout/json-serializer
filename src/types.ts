export { types }

const types: readonly Type<any, any>[] = [
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
  ts({
    is: (val) => val instanceof Date,
    match: (str) => str.startsWith('!Date:'),
    serialize: (val: Date) => '!Date:' + val.toISOString(),
    deserialize: (str) => new Date(str.slice('!Date:'.length)),
  }),
  ts({
    is: (val) => typeof val === 'bigint',
    match: (str) => str.startsWith('!BigInt:'),
    serialize: (val: BigInt) => '!BigInt:' + val.toString(),
    deserialize: (str) => {
      if (typeof BigInt === 'undefined') {
        throw new Error('Your JavaScript environement does not support BigInt. Consider adding a polyfill.')
      }
      return BigInt(str.slice('!BigInt:'.length))
    },
  }),
  ts({
    is: (val) => val instanceof RegExp,
    match: (str) => str.startsWith('!RegExp:'),
    serialize: (val: RegExp) => '!RegExp:' + val.toString(),
    deserialize: (str) => {
      str = str.slice('!RegExp:'.length)
      // const args: string[] = str.match(/\/(.*?)\/([gimy])?$/)!
      const args: string[] = str.match(/\/(.*)\/(.*)?/)!
      const pattern: string = args[1]!
      const flags: string = args[2]!
      return new RegExp(pattern, flags)
    },
  }),
  ts({
    is: (val) => val instanceof Map,
    match: (str) => str.startsWith('!Map:'),
    serialize: (val: Map<unknown, unknown>, serializer: (val: [unknown, unknown][]) => string) =>
      '!Map:' + serializer(Array.from(val.entries())),
    deserialize: (str, parser) => new Map(parser(str.slice('!Map:'.length))),
  }),
  ts({
    is: (val) => val instanceof Set,
    match: (str) => str.startsWith('!Set:'),
    serialize: (val: Set<unknown>, serializer: (val: unknown[]) => string) =>
      '!Set:' + serializer(Array.from(val.values())),
    deserialize: (str, parser) => new Set(parser(str.slice('!Set:'.length))),
  }),
  // Avoid collisions with the special strings defined above
  ts({
    is: (val) => typeof val === 'string' && val.startsWith('!'),
    match: (str) => str.startsWith('!'),
    serialize: (val: string) => '!' + val,
    deserialize: (str) => str.slice(1),
  }),
] as const

type Type<ValueType, IntermediateType> = {
  is: (val: unknown) => asserts val is ValueType
  match: (str: string) => boolean
  serialize: (val: ValueType, serializer: (val: IntermediateType) => string) => string
  deserialize: (str: string, parser: (str: string) => IntermediateType) => ValueType
}

// Type check
function ts<T, IntermediateType>(t: Type<T, IntermediateType>) {
  return t
}
