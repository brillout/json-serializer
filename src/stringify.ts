export { stringify }

import { types } from './types'
import { isReactElement } from './utils/isReactElement'
import { isCallable } from './utils/isCallable'
import { isObject } from './utils/isObject'
import { replacerWithPath } from './replacerWithPath'

function stringify(
  value: unknown,
  {
    forbidReactElements,
    space,
    valueName,
    sortObjectKeys
  }: { forbidReactElements?: boolean; space?: number; valueName?: string; sortObjectKeys?: boolean } = {}
): string {
  // The only error `JSON.stringify()` can throw is `TypeError "cyclic object value"`.
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
  // - This means we have total of 3 possible errors while serializing:
  //    - Cyclic references
  //    - Functions
  //    - React elements
  const serializer = (val: unknown) => JSON.stringify(val, replacerWithPath(replacer, !valueName), space)

  return serializer(value)

  function replacer(this: Record<string, unknown>, key: string, value: unknown, path: string) {
    if (forbidReactElements && isReactElement(value)) {
      throw new Error(genErrMsg('React element', path, valueName))
    }

    if (isCallable(value)) {
      const functionName = value.name
      throw new Error(genErrMsg('function', path, valueName, path.length === 0 ? functionName : undefined))
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
}

function genErrMsg(
  valueType: 'React element' | 'function',
  path: string,
  rootValueName?: string,
  problematicValueName?: string
) {
  let subject: string
  if (!path) {
    subject = rootValueName || problematicValueName || 'value'
  } else {
    if (problematicValueName) {
      subject = problematicValueName + ' at '
    } else {
      subject = ''
    }
    subject = subject + (rootValueName || '') + path
  }
  return `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize ${subject} because it's a ${valueType}.`
}
