export { stringify }
export { isJsonSerializerError }

import { types } from './types'
import { isReactElement } from './utils/isReactElement'
import { isCallable } from './utils/isCallable'
import { isObject } from './utils/isObject'
import { replacerWithPath, type Iterable } from './utils/replacerWithPath'

function stringify(
  value: unknown,
  {
    forbidReactElements,
    space,
    valueName,
    sortObjectKeys,
    // Used by Vike: https://github.com/vikejs/vike/blob/b4ba6b70e6bdc2e1f460c0d2e4c3faae5d0a733c/vike/node/plugin/plugins/importUserCode/v1-design/getConfigValuesSerialized.ts#L78
    replacer: replacerUserProvided,
  }: {
    forbidReactElements?: boolean
    space?: number
    valueName?: string
    sortObjectKeys?: boolean
    replacer?: (this: Iterable, key: string, value: unknown, path: string) => void | { replacement: unknown }
  } = {},
): string {
  // The only error `JSON.stringify()` can throw is `TypeError "cyclic object value"`.
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
  // - This means we have total of 3 possible errors while serializing:
  //    - Cyclic references
  //    - Functions
  //    - React elements
  const serializer = (val: unknown) => JSON.stringify(val, replacerWithPath(replacer, !valueName), space)

  return serializer(value)

  function replacer(this: Iterable, key: string, value: unknown, path: string) {
    {
      const ret = replacerUserProvided?.call(this, key, value, path)
      if (ret) return ret.replacement
    }

    if (forbidReactElements && isReactElement(value)) {
      throw genErr(genErrMsg('React element', path, valueName))
    }

    if (isCallable(value)) {
      const functionName = value.name
      throw genErr(genErrMsg('function', path, valueName, path.length === 0 ? functionName : undefined))
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

const stamp = '_isJsonSerializerError'
type JsonSerializerError = Error & {
  messageCore: string
}
function genErr(errMsg: string) {
  const err = new Error(`[@brillout/json-serializer](https://github.com/brillout/json-serializer) ${errMsg}.`)
  Object.assign(err, {
    messageCore: errMsg,
    [stamp]: true,
  })
  return err
}
function isJsonSerializerError(thing: unknown): thing is JsonSerializerError {
  return isObject(thing) && thing[stamp] === true
}
function genErrMsg(
  valueType: 'React element' | 'function',
  path: string,
  rootValueName?: string,
  problematicValueName?: string,
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
  return `cannot serialize ${subject} because it's a ${valueType}`
}
