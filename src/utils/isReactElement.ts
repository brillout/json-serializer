export function isReactElement(value: unknown) {
  return (
    typeof value === 'object' &&
    value !== null &&
    String((value as Record<string, unknown>)['$$typeof']) === 'Symbol(react.element)'
  )
}
