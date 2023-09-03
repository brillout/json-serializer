import { parse } from '../src/parse'
import { stringify } from '../src/stringify'
import { describe, it } from 'vitest'
import assert from 'assert'

describe('escaping', () => {
  it('avoids collision with character `!`', () => {
    ;['!undefined', '!Date:2021-01-12T21:22:42.143Z', '!NaN', '!Infinity', `!RegExp:/^\d+$/g`].forEach((val) => {
      assert(stringify(val) === `"!${val}"`)
      assert(parse(stringify(val)) === val)
      assert(parse(stringify({ val })).val === val)
      assert(parse(stringify({ val: { val } })).val.val === val)
    })
  })
})

describe('sortObjectKeys option', () => {
  it('works', () => {
    // Basic test
    {
      const obj = {
        b: 2,
        a: 1
      }
      {
        const keys = Object.keys(obj)
        assert(keys[0] === 'b')
      }
      {
        const copy = parse(stringify(obj))
        const keys = Object.keys(copy)
        assert(keys[0] === 'b')
      }
      {
        const copy = parse(stringify(obj, { sortObjectKeys: true }))
        const keys = Object.keys(copy)
        assert(keys[0] === 'a')
      }
    }

    // Nested test
    {
      const obj = {
        a: {
          d: 2,
          c: 3
        }
      }
      {
        const keys = Object.keys(obj.a)
        assert(keys[0] === 'd')
      }
      {
        const copy = parse(stringify(obj))
        const keys = Object.keys(copy.a)
        assert(keys[0] === 'd')
      }
      {
        const copy = parse(stringify(obj, { sortObjectKeys: true }))
        const keys = Object.keys(copy.a)
        assert(keys[0] === 'c')
      }
    }
  })
})
