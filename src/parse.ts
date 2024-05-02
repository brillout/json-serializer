export { parse }
export { parseTransform }

import { types } from './types'

function parse(str: string): unknown {
  // We don't use the reviver option in `JSON.parse(str, reviver)` because it doesn't support `undefined` values
  const value = JSON.parse(str)
  return parseTransform(value)
}

function parseTransform(value: unknown): unknown {
  if (typeof value === 'string') {
    return reviver(value)
  }
  if (
    // Also matches arrays
    typeof value === 'object' &&
    value !== null
  ) {
    Object.entries(value).forEach(([key, val]: [string, unknown]) => {
      ;(value as Record<string, unknown>)[key] = parseTransform(val)
    })
  }
  return value
}

function reviver(value: string) {
  for (const { match, deserialize } of types) {
    if (match(value)) {
      return deserialize(value, parse)
    }
  }
  return value
}
