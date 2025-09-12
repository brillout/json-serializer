export { replacerWithPath }
export type { Iterable }
export type { Path }

// https://stackoverflow.com/questions/61681176/json-stringify-replacer-how-to-get-full-path/63957172#63957172

type Path = (string | number)[]
type Iterable = Record<string, unknown>
// TODO/now rename here as well
type Replacer = (this: Iterable, key: string, value: unknown, path: Path) => unknown
function replacerWithPath(replacer: Replacer) {
  const pathMap = new WeakMap<Iterable, Path>()
  // TODO/now rename to replacerForJsonStringify
  return function (this: Iterable, key: string, value: unknown) {
    const pathPrevious = pathMap.get(this) ?? []
    const path = [...pathPrevious]
    if (key !== '') {
      const pathEntry = !Array.isArray(this) ? key : parseInt(key, 10)
      path.push(pathEntry)
    }
    if (isIterable(value)) pathMap.set(value, path)
    return replacer.call(this, key, value, path)
  }
}
function isIterable(value: unknown): value is Iterable {
  return value === Object(value)
}
