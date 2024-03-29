export { parse }

import { types } from './types'

function parse(str: string) {
  // We don't use the reviver option in `JSON.parse(str, reviver)` because it doesn't support `undefined` values
  const value = JSON.parse(str)
  return modifier(value)
}

function modifier(value: unknown) {
  if (typeof value === 'string') {
    return reviver(value)
  }
  if (typeof value === 'object' && value !== null) {
    Object.entries(value).forEach(([key, val]: [string, unknown]) => {
      ;(value as Record<string, unknown>)[key] = modifier(val)
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
