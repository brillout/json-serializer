export { addPathToReplacer }
export type { Iterable }
export type { Path }

// https://stackoverflow.com/questions/61681176/json-stringify-replacer-how-to-get-full-path/63957172#63957172

type Path = (string | number)[]
type Iterable = Record<string, unknown>
type Replacer = (this: Iterable, key: string, valueAfterNativeJsonStringify: unknown, path: Path) => unknown
/**
 * The `replacer()` callback of `JSON.stringify()` doesn't provide the path of the object property that is being stringified.
 *
 * `addPathToReplacer(replacer)` adds the property path to the `replacer()` callback as last parameter.
 */
function addPathToReplacer(replacer: Replacer) {
  const pathMap = new WeakMap<Iterable, Path>()
  return replacerForJsonStringify
  function replacerForJsonStringify(this: Iterable, key: string, valueAfterNativeJsonStringify: unknown) {
    const pathPrevious = pathMap.get(this) ?? []
    const path = [...pathPrevious]
    if (key !== '') {
      const pathEntry = !Array.isArray(this) ? key : parseInt(key, 10)
      path.push(pathEntry)
    }
    if (isIterable(valueAfterNativeJsonStringify)) pathMap.set(valueAfterNativeJsonStringify, path)
    return replacer.call(this, key, valueAfterNativeJsonStringify, path)
  }
}
function isIterable(value: unknown): value is Iterable {
  return value === Object(value)
}
