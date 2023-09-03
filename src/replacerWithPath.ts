export { replacerWithPath }

// https://stackoverflow.com/questions/61681176/json-stringify-replacer-how-to-get-full-path/63957172#63957172

type Iterable = Record<string, unknown>
function replacerWithPath(replacer: (this: Iterable, key: string, value: unknown, path: string) => unknown) {
  const paths = new WeakMap<Iterable, string>()
  return function (this: Iterable, key: string, value: unknown) {
    const path = (paths.get(this) ?? '') + (key ? getKeyName(key, this) : '')
    if (isIterable(value)) paths.set(value, path)
    return replacer.call(this, key, value, path)
  }
}
function isIterable(value: unknown): value is Iterable {
  return value === Object(value)
}
function getKeyName(key: string, obj: Iterable) {
  return Array.isArray(obj) ? `[${key}]` : `['${key}']`
}
