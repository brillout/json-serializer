export function isKeyDotNotationCompatible(key: string): boolean {
  return /^[a-z0-9\$_]+$/i.test(key)
}
