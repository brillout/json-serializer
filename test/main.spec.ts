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
      assert(stringify(val, { htmlScriptSafe: false }) === `"!${val}"`)
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
    //*
    const slashReplacer = '\\/'
    /*/
    const slashReplacer = 'H'
    //*/

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
            deeper: {
              e: '/ bla/',
            },
          },
        }),
      ),
      deepOutsideMap: {
        f: '/foo/',
      },
      someDate: new Date(2025),
    }

    const objStr = stringify(obj, {
      htmlScriptSafe: false,
      replacer(_key, value) {
        if (typeof value === 'string') {
          return { replacement: value.replaceAll('/', slashReplacer), resolved: false }
        }
      },
    })

    expect(objStr).toMatchInlineSnapshot(
      `"{"pageId":"\\\\/pages\\\\/index","a":"!!\\\\/ hello","b":"!! world","nested":"!Map:[[\\"pageId\\",\\"\\\\\\\\/pages\\\\\\\\/about\\"],[\\"c\\",\\"!!!\\\\\\\\/ escaped\\"],[\\"deeply\\",{\\"pageId\\":\\"\\\\\\\\/pages\\\\\\\\/bla\\",\\"d\\":\\"!!\\\\\\\\/ also escaped\\",\\"deeper\\":{\\"e\\":\\"\\\\\\\\/ bla\\\\\\\\/\\"}}]]","deepOutsideMap":{"f":"\\\\/foo\\\\/"},"someDate":"!Date:1970-01-01T00:00:02.025Z"}"`,
    )

    expect(
      parse(objStr, {
        reviver(_key, value) {
          if (typeof value === 'string') {
            return { replacement: value.replaceAll(slashReplacer, '/'), resolved: false }
          }
        },
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

describe('reviver path', () => {
  it('receives the path to every revived string', () => {
    const paths: string[][] = []
    parse('{"a":{"b":["X","Y"]},"c":"Z"}', {
      reviver(path) {
        paths.push([...path])
        return undefined
      },
    })
    expect(paths).toEqual([['a', 'b', '0'], ['a', 'b', '1'], ['c']])
  })

  it('root path is []', () => {
    let captured: readonly string[] | undefined
    parse('"hello"', {
      reviver(path) {
        captured = path
        return undefined
      },
    })
    expect(captured).toEqual([])
  })

  it('enables per-position replacement', () => {
    const result = parse('{"a":"x","b":"x"}', {
      reviver(path, value) {
        if (path.join('.') === 'a') return { replacement: `at-a:${value}` }
        return undefined
      },
    })
    expect(result).toEqual({ a: 'at-a:x', b: 'x' })
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

describe('htmlScriptSafe', () => {
  it('is on by default — escapes `<` and `/`', () => {
    expect(stringify({ a: '<b>', u: 'x/y' })).toBe('{"a":"\\u003cb>","u":"x\\/y"}')
  })
  it('escapes `<` so a value containing `</script>` cannot break out of a <script>', () => {
    const serialized = stringify({ a: '</script>' }, { htmlScriptSafe: { escapeURLs: false } })
    expect(serialized).toBe('{"a":"\\u003c/script>"}')
    expect(serialized.includes('</script>')).toBe(false)
  })
  it('escapeURLs escapes `/` (anti-crawl)', () => {
    const value = { url: 'https://example.com/a/b' }
    const serialized = stringify(value, { htmlScriptSafe: { escapeURLs: true } })
    expect(serialized).toContain('https:\\/\\/example.com\\/a\\/b')
    expect(serialized).not.toContain('://')
    expect(parse(serialized)).toEqual(value)
  })
  it('is transparent: parse() recovers the original value', () => {
    const value = { html: '</script><!--<script><img src=x onerror=alert(1)>', url: 'https://example.com/a/b' }
    expect(parse(stringify(value))).toEqual(value)
  })
  it('parse() decodes the JSON escapes htmlScriptSafe relies on (`\\u003c` -> `<`, `\\/` -> `/`)', () => {
    // No reviver / parse() change is needed: these are standard JSON escapes that JSON.parse decodes natively.
    expect(parse('"\\u003c"')).toBe('<')
    expect(parse('"\\/"')).toBe('/')
  })
  it('escapes every `<`, also in keys and nested values', () => {
    const value = { '<k>': ['<a>', { '<b>': '<c>' }] }
    const serialized = stringify(value, { htmlScriptSafe: { escapeURLs: false } })
    expect(serialized.includes('<')).toBe(false)
    expect(parse(serialized)).toEqual(value)
  })
  it('`{ escapeURLs: false }` keeps `/` but still escapes `<`', () => {
    expect(stringify({ url: 'a/b', x: '<y>' }, { htmlScriptSafe: { escapeURLs: false } })).toBe(
      '{"url":"a/b","x":"\\u003cy>"}',
    )
  })
  it('`htmlScriptSafe: false` disables all escaping', () => {
    expect(stringify({ url: 'a/b', x: '<y>' }, { htmlScriptSafe: false })).toBe('{"url":"a/b","x":"<y>"}')
  })
})
