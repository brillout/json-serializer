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
  ts({
    is: (val) => val instanceof Uint8Array,
    match: (str) => str.startsWith('!Uint8Array:'),
    serialize: (val: Uint8Array) => '!Uint8Array:' + toBase64(val),
    deserialize: (str) => fromBase64(str.slice('!Uint8Array:'.length)),
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

// base64url without padding: no `/` for `htmlScriptSafe` to escape
// `Uint8Array.prototype.toBase64()` / `Uint8Array.fromBase64()` are much faster than the `btoa()` / `atob()` fallback
type Uint8ArrayBase64 = {
  toBase64?: (this: Uint8Array, options: { alphabet: 'base64url'; omitPadding: boolean }) => string
  fromBase64?: (str: string, options: { alphabet: 'base64url' }) => Uint8Array
}
function toBase64(bytes: Uint8Array): string {
  const { toBase64 } = Uint8Array.prototype as Uint8ArrayBase64
  if (toBase64) return toBase64.call(bytes, { alphabet: 'base64url', omitPadding: true })
  let binary = ''
  // In slices: spreading a large array into a single call overflows the stack
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}
function fromBase64(str: string): Uint8Array {
  const { fromBase64 } = Uint8Array as Uint8ArrayBase64
  if (fromBase64) return fromBase64(str, { alphabet: 'base64url' })
  const binary = atob(str.replaceAll('-', '+').replaceAll('_', '/') + '==='.slice(0, (4 - (str.length % 4)) % 4))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}
