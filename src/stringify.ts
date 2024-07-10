export { stringify }
export { isJsonSerializerError }

import { types } from './types'
import { isReactElement } from './utils/isReactElement'
import { isCallable } from './utils/isCallable'
import { isObject } from './utils/isObject'
import { replacerWithPath, type Iterable, type Path } from './utils/replacerWithPath'

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
    replacer?: (this: Iterable, key: string, value: unknown) => void | { replacement: unknown }
  } = {},
): string {
  const canBeFirstKey = !valueName

  // The only error `JSON.stringify()` can throw is `TypeError "cyclic object value"`.
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
  // - This means we have total of 3 possible errors while serializing:
  //    - Cyclic references
  //    - Functions
  //    - React elements
  const serializer = (val: unknown) => JSON.stringify(val, replacerWithPath(replacer), space)

  return serializer(value)

  function replacer(this: Iterable, key: string, value: unknown, path: Path) {
    {
      const ret = replacerUserProvided?.call(this, key, value)
      if (ret) return ret.replacement
    }

    if (forbidReactElements && isReactElement(value)) {
      throw genErr({
        value,
        valueType: 'React element',
        path,
        canBeFirstKey,
        rootValueName: valueName,
      })
    }

    if (isCallable(value)) {
      const functionName = value.name
      throw genErr({
        value,
        valueType: 'function',
        path,
        canBeFirstKey,
        rootValueName: valueName,
        problematicValueName: path.length === 0 ? functionName : undefined,
      })
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

function genErr({
  value,
  valueType,
  path,
  canBeFirstKey,
  rootValueName,
  problematicValueName,
}: {
  value: unknown
  valueType: ValueType
  path: Path
  canBeFirstKey: boolean
  rootValueName?: string
  problematicValueName?: string
}) {
  const pathString = getPathString(path, canBeFirstKey)
  const subject = getSubjectName({ pathString, rootValueName, problematicValueName })
  const errMsg = `cannot serialize ${subject} because it's a ${valueType}`
  const err = new Error(`[@brillout/json-serializer](https://github.com/brillout/json-serializer) ${errMsg}.`)
  const errAddendum: ErrAddendum & { [stamp]: true } = {
    messageCore: errMsg,
    [stamp]: true,
    value,
    path,
    pathString,
  }
  Object.assign(err, errAddendum)
  return err
}
type ErrAddendum = {
  messageCore: string
  value: unknown
  path: Path
  pathString: string
}
const stamp = '_isJsonSerializerError'
function isJsonSerializerError(thing: unknown): thing is Error & ErrAddendum {
  return isObject(thing) && thing[stamp] === true
}
type ValueType = 'React element' | 'function'
function getSubjectName({
  rootValueName,
  pathString,
  problematicValueName,
}: {
  pathString: string
  rootValueName?: string
  problematicValueName?: string
}) {
  let subject: string
  if (!pathString) {
    subject = rootValueName || problematicValueName || 'value'
  } else {
    if (problematicValueName) {
      subject = problematicValueName + ' at '
    } else {
      subject = ''
    }
    subject = subject + (rootValueName || '') + pathString
  }
  return subject
}

function getPathString(path: Path, canBeFirstKey: boolean): string {
  const pathString = path
    .map((key, i) => {
      if (typeof key === 'number') {
        return `[${key}]`
      }
      if (i === 0 && canBeFirstKey && isKeyDotNotationCompatible(key)) {
        return key
      }
      return getPropAccessNotation(key)
    })
    .join('')
  return pathString
}
function getPropAccessNotation(key: unknown): `.${string}` | `[${string}]` {
  return typeof key === 'string' && isKeyDotNotationCompatible(key) ? `.${key}` : `[${JSON.stringify(key)}]`
}
function isKeyDotNotationCompatible(key: string): boolean {
  return /^[a-z0-9\$_]+$/i.test(key)
}
