import { stringify } from '../src/stringify'
import { expect, describe, it } from 'vitest'
import React from 'react'

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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`helloFn\` because it's a function."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize value because it's a function."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize value because it's a React element."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`value['prop']\` because it's a React element."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`value['foo']\` because it's a function."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`value['foo']\` because it's a function."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`value['some']['nested']['prop']\` because it's a React element."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`value['some']['nested']['prop']\` because it's a function."`
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
        `"@brillout/json-serializer (https://github.com/brillout/json-serializer) cannot serialize \`value['someProp']\` because it's a function."`
      )
    }
  })
})
