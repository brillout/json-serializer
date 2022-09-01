export { stringify }

import { types } from './types'
import { isReactElement } from './utils/isReactElement'
import { isCallable } from './utils/isCallable'
import { isObject } from './utils/isObject'

function stringify(
  value: unknown,
  {
    forbidReactElements,
    space,
    valueName = 'value',
    sortObjectKeys,
  }: { forbidReactElements?: boolean; space?: number; valueName?: string; sortObjectKeys?: boolean } = {},
): string {
  const path: string[] = []

  // The only error `JSON.stringify()` can throw is `TypeError "cyclic object value"`.
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
  // - This means we have total of 3 possible errors while serializing:
  //    - Cyclic references
  //    - Functions
  //    - React elements
  const serializer = (val: unknown) => JSON.stringify(val, replacer, space)

  return serializer(value)

  function replacer(this: Record<string, unknown>, key: string, value: unknown) {
    if (key !== '') {
      path.push(key)
    }

    if (forbidReactElements && isReactElement(value)) {
      throw new Error(genErrMsg('React element'))
    }

    if (isCallable(value)) {
      const functionName = value.name
      throw new Error(genErrMsg('function', path.length === 0 ? functionName : undefined))
    }

    const valueOriginal = this[key]
    for (const { is, serialize } of types.slice().reverse()) {
      if (is(valueOriginal) as any) {
        //@ts-ignore
        return serialize(valueOriginal, serializer)
      }
    }

    if (sortObjectKeys && isObject(value)) {
      const copy: Record<string, unknown> = {}
      Object.keys(value)
        .sort()
        .forEach((key) => {
          copy[key] = (value as Record<string, unknown>)[key]
        })
      value = copy
    }

    return value
  }

  function genErrMsg(valueType: 'React element' | 'function', valName?: string) {
    const name = valName ? ' `' + valName + '`' : ''
    const location =
      path.length === 0 ? '' : ` ${name ? 'at ' : ''}\`${valueName}[${path.map((p) => `'${p}'`).join('][')}]\``
    const fallback = name === '' && location === '' ? ` ${valueName}` : ''
    return `Cannot serialize${name}${location}${fallback} because it is a ${valueType} (https://github.com/brillout/json-s)`
  }
}
