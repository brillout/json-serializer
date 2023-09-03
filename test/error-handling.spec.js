import { stringify } from '../src/stringify'
import { expect, describe, it, beforeAll } from 'vitest'
import assert from 'assert'
import React from 'react'

// Prettify inline snapshots
beforeAll(() => {
  const test = (val) => typeof val === 'string'
  expect.addSnapshotSerializer({
    serialize(val) {
      assert(test(val))
      return val
    },
    test
  })
})

describe('error handling', () => {
  it('error serializing function', () => {
    {
      let err
      try {
        console.log(stringify(function helloFn() {}))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize helloFn because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(stringify(() => {}))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize value because it's a function.`
      )
    }
  })
  it('error serializing React element', () => {
    const reactElement = React.createElement('div')
    {
      let err
      try {
        console.log(stringify(reactElement, { forbidReactElements: true }))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize value because it's a React element.`
      )
    }
  })
  it('error path', () => {
    {
      let err
      try {
        console.log(stringify({ prop: React.createElement(React.Fragment) }, { forbidReactElements: true }))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize prop because it's a React element.`
      )
    }

    {
      let err
      try {
        console.log(stringify({ foo() {} }, { forbidReactElements: true }))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize foo because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(stringify({ foo: () => {} }, { forbidReactElements: true }))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize foo because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(
          stringify({ some: { nested: { prop: React.createElement(React.Fragment) } } }, { forbidReactElements: true })
        )
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize some.nested.prop because it's a React element.`
      )
    }

    {
      let err
      try {
        console.log(stringify({ some: { nested: { prop: () => {} } } }))
        //console.log(stringify({someProp: function helloFn() {}}))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize some.nested.prop because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(stringify({ someProp: function helloFn() {} }))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize someProp because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(
          stringify(
            {
              title: {
                env: 'server-and-client'
              },
              onBeforeRenderIsomorph: {
                env: 'config-only',
                effect() {}
              }
            },
            { valueName: 'config["meta"]' }
          )
        )
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize config["meta"].onBeforeRenderIsomorph.effect because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(
          stringify({
            passToClient: ['pageProps', 'title', 'someAsyncProps'],
            clientRouting: true,
            hydrationCanBeAborted: true,
            meta: {
              title: {
                env: 'server-and-client'
              },
              onBeforeRenderIsomorph: {
                env: 'config-only',
                effect() {}
              }
            }
          })
        )
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize meta.onBeforeRenderIsomorph.effect because it's a function.`
      )
    }

    {
      let err
      try {
        console.log(stringify(['ii', { ['a.b']: { ['s s']: { [0]: { ['a)']: [{ f0$_() {} }] } } } }]))
      } catch (_err) {
        err = _err
      }
      expect(err.message).toMatchInlineSnapshot(
        `[@brillout/json-serializer](https://github.com/brillout/json-serializer) cannot serialize [1]["a.b"]["s s"].0["a)"][0].f0$_ because it's a function.`
      )
    }
  })
})
