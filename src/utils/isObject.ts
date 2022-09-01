export { isObject }

type Object = Record<string, unknown>

function isObject(value: unknown): value is Object {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  if (Array.isArray(value)) {
    return false
  }
  return true
}
