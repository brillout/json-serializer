import { parse } from '../src/parse'
import { stringify } from '../src/stringify'
import { describe, it, expect } from 'vitest'
import assert from 'assert'

describe('basics', () => {
  it('works', () => {
    expect(stringify(1)).toBe('1')
    expect(stringify('1')).toBe('"1"')
    expect(stringify({ a: 1 })).toBe('{"a":1}')
    expect(stringify({ a: '1' })).toBe('{"a":"1"}')
    ;[1, '1', { a: '1' }, { a: { b: 1 } }].forEach((val) => {
      expect(parse(stringify(val))).toEqual(val)
    })
  })
})

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
  it('can be used to prevent Google from crawling URLs in JSON', () => {
    const obj = {
      pageId: '/pages/index',
      // There are no collision, because json-serializer already escapes the leading !
      a: '!/ hello',
      b: '! world',
      nested: new Map(
        Object.entries({
          pageId: '/pages/about',
          c: '!!/ escaped',
          deeply: {
            pageId: '/pages/bla',
            d: '!/ also escaped',
          },
        }),
      ),
    }
    const objStr = stringify(obj, {
      // Prepend ! to paths
      replacer(_key, value) {
        if (typeof value === 'string' && value.startsWith('/')) {
          return { replacement: (value = '!' + value) }
        }
      },
    })
    expect(objStr).toMatchInlineSnapshot(
      `"{"pageId":"!/pages/index","a":"!!/ hello","b":"!! world","nested":"!Map:[[\\"pageId\\",\\"!/pages/about\\"],[\\"c\\",\\"!!!/ escaped\\"],[\\"deeply\\",{\\"pageId\\":\\"!/pages/bla\\",\\"d\\":\\"!!/ also escaped\\"}]]"}"`,
    )
    expect(
      parse(objStr, {
        /* Not needed because ! is already handled by @brillout/json-serializer
        reviver(_key, value) {
          if (value.startsWith('!/')) {
            return { replacement: value.slice(1) }
          }
        },
        */
      }),
    ).toEqual(obj)
  })
})

describe('user-defined reviver', () => {
  it('can be used to support custom classes', () => {
    class Rectangle {
      height: number
      width: number
      updated: Date
      constructor(height: number, width: number) {
        this.height = height
        this.width = width
        this.updated = new Date()
      }
    }
    const obj = new Rectangle(11, 22)
    const objStr = stringify(obj, {
      replacer(_key, value, serializer) {
        if (value instanceof Rectangle) {
          const data = { height: value.height, width: value.width, updated: value.updated }
          return {
            replacement: '!Rectangle:' + serializer(data),
            resolved: true,
          }
        }
      },
    })
    expect(
      parse(objStr, {
        // Restore original string
        reviver(_key, value, parser) {
          const prefix = '!Rectangle:'
          if (value.startsWith(prefix)) {
            const data = parser(value.slice(prefix.length)) as { height: number; width: number; updated: Date }
            expect(data.updated.constructor).toBe(Date)
            const replacement = new Rectangle(data.height, data.width)
            replacement.updated = data.updated
            return { replacement }
          }
        },
      }),
    ).toEqual(obj)
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
