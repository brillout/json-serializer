export { replacerWithPath }

// https://stackoverflow.com/questions/61681176/json-stringify-replacer-how-to-get-full-path/63957172#63957172

type Iterable = Record<string, unknown>
function replacerWithPath(replacer: (this: Iterable, key: string, value: unknown, path: string) => unknown, canBeFirstKey: boolean) {
  const paths = new WeakMap<Iterable, string>()
  return function (this: Iterable, key: string, value: unknown) {
    const prefix = paths.get(this)
    const path = (prefix ?? '') + (key ? getKeyName(key, this, !prefix && canBeFirstKey) : '')
    if (isIterable(value)) paths.set(value, path)
    return replacer.call(this, key, value, path)
  }
}
function isIterable(value: unknown): value is Iterable {
  return value === Object(value)
}
function getKeyName(key: string, obj: Iterable, isFirstKey: boolean) {
  if (Array.isArray(obj)) return `[${key}]`
  if (/^[a-z0-9\$_]+$/i.test(key)) return !isFirstKey ? `.${key}` : key
  return `[${JSON.stringify(key)}]`
}
