import { parse } from './dist/parse.js'
import { stringify } from './dist/stringify.js'

// Test the specific case from the failing test
const slashReplacer = '\\/'

const obj = {
  pageId: '/pages/index',
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
  someDate: new Date(2025)
}

console.log('Original object:')
console.log('someDate type:', typeof obj.someDate)
console.log('someDate value:', obj.someDate)
console.log('someDate instanceof Date:', obj.someDate instanceof Date)

const objStr = stringify(obj, {
  replacer(_key, value) {
    if (typeof value === 'string') {
      return { replacement: value.replaceAll('/', slashReplacer), resolved: false }
    }
  },
})

console.log('\nSerialized string:')
console.log(objStr)

const parsed = parse(objStr, {
  reviver(_key, value) {
    if (typeof value === 'string') {
      return { replacement: value.replaceAll(slashReplacer, '/'), resolved: false }
    }
  },
})

console.log('\nParsed object:')
console.log('someDate type:', typeof parsed.someDate)
console.log('someDate value:', parsed.someDate)
console.log('someDate instanceof Date:', parsed.someDate instanceof Date)

console.log('\nAre they equal?')
console.log('someDate values equal:', obj.someDate.getTime() === parsed.someDate.getTime())
