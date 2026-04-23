export { parse }
// Used by Vike: https://github.com/vikejs/vike/blob/b4ba6b70e6bdc2e1f460c0d2e4c3faae5d0a733c/vike/shared/page-configs/serialize/parseConfigValuesSerialized.ts#L13
export { parseTransform }
export type { Reviver }

import { types } from './types.js'

type Reviver = (
  path: undefined | readonly string[],
  value: string,
  parser: (str: string) => unknown,
) => { replacement: unknown; resolved?: boolean } | undefined
type Options = {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#reviver
  // AFAIK it isn't used by anyone yet
  reviver?: Reviver
}
function parse(str: string, options: Options = {}): unknown {
  // We don't use the reviver option in `JSON.parse(str, reviver)` because it doesn't support `undefined` values
  const value = JSON.parse(str)
  return parseTransform(value, options)
}

function parseTransform(value: unknown, options: Options = {}, path?: readonly string[]): unknown {
  if (typeof value === 'string') {
    return reviver(value, options, path)
  }
  if (
    // Also matches arrays
    typeof value === 'object' &&
    value !== null
  ) {
    Object.entries(value).forEach(([key, val]: [string, unknown]) => {
      ;(value as Record<string, unknown>)[key] = parseTransform(val, options, path === undefined ? [key] : [...path, key])
    })
  }
  return value
}

function reviver(value: string, options: Options, path: readonly string[] | undefined): unknown {
  const parser = (str: string) => parse(str, options)
  {
    const res = options.reviver?.(path, value, parser)
    if (res) {
      if (typeof res.replacement !== 'string') {
        return res.replacement
      } else {
        value = res.replacement
        if (res.resolved) return value
      }
    }
  }
  for (const { match, deserialize } of types) {
    if (match(value)) {
      return deserialize(value, parser)
    }
  }
  return value
}
