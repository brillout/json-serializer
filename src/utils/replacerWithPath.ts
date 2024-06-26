export { replacerWithPath }
export type { Iterable }

// https://stackoverflow.com/questions/61681176/json-stringify-replacer-how-to-get-full-path/63957172#63957172

import { isKeyDotNotationCompatible } from './isKeyDotNotationCompatible'

type Iterable = Record<string, unknown>
type Replacer = (this: Iterable, key: string, value: unknown, path: string) => unknown
function replacerWithPath(replacer: Replacer, canBeFirstKey: boolean) {
  const paths = new WeakMap<Iterable, string>()
  return function (this: Iterable, key: string, value: unknown) {
    const prefix = paths.get(this)
    const path = (prefix ?? '') + (key ? getPropAccessNotation(key, this, !prefix && canBeFirstKey) : '')
    if (isIterable(value)) paths.set(value, path)
    return replacer.call(this, key, value, path)
  }
}
function isIterable(value: unknown): value is Iterable {
  return value === Object(value)
}
function getPropAccessNotation(key: string, obj: Iterable, isFirstKey: boolean) {
  if (Array.isArray(obj)) return `[${key}]`
  if (isKeyDotNotationCompatible(key)) return !isFirstKey ? `.${key}` : key // Dot notation
  return `[${JSON.stringify(key)}]` // Bracket notation
}
