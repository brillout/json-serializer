import { parse } from '../src/parse'
import { stringify } from '../src/stringify'
import { describe, it, expect } from 'vitest'
import assert from 'assert'

describe('escaping', () => {
  it('avoids collision with character `!`', () => {
    ;['!undefined', '!Date:2021-01-12T21:22:42.143Z', '!NaN', '!Infinity', `!RegExp:/^\d+$/g`].forEach((val) => {
      assert(stringify(val) === `"!${val}"`)
      assert(parse(stringify(val)) === val)
      assert((parse(stringify({ val })) as any).val === val)
      assert((parse(stringify({ val: { val } })) as any).val.val === val)
    })
  })
})

describe('user-defined replacer', () => {
  it('works', () => {
    expect(
      stringify(
        { icon: 'import:/assets/logo.svg:default', title: 'Hello' },
        {
          replacer(_key, value) {
            if (typeof value === 'string' && value.startsWith('import:')) {
              return { replacement: 'import42' }
            }
          },
        },
      ),
    ).toBe('{"icon":"import42","title":"Hello"}')
  })
})

describe('sortObjectKeys option', () => {
  it('works', () => {
    // Basic test
    {
      const obj = {
        b: 2,
        a: 1,
      }
      {
        const keys = Object.keys(obj)
        assert(keys[0] === 'b')
      }
      {
        const copy = parse(stringify(obj)) as object
        const keys = Object.keys(copy)
        assert(keys[0] === 'b')
      }
      {
        const copy = parse(stringify(obj, { sortObjectKeys: true })) as object
        const keys = Object.keys(copy)
        assert(keys[0] === 'a')
      }
    }

    // Nested test
    {
      const obj = {
        a: {
          d: 2,
          c: 3,
        },
      }
      {
        const keys = Object.keys(obj.a)
        assert(keys[0] === 'd')
      }
      {
        const copy = parse(stringify(obj)) as typeof obj
        const keys = Object.keys(copy.a)
        assert(keys[0] === 'd')
      }
      {
        const copy = parse(stringify(obj, { sortObjectKeys: true })) as typeof obj
        const keys = Object.keys(copy.a)
        assert(keys[0] === 'c')
      }
    }
  })
})
