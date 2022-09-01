const assert = require('assert')
const { parse, stringify } = require('../')
const React = require('react')

canSerializeUndefined()
canSerializeDate()
canSerializeNaN()
canSerializeInfinity()
canSerializeNegativeInfinity()
canSerializeRegExp()
canSerializeSet()
canSerializeMap()
canSerializeBigInt()

avoidsCollision()

errorSerializingFunction()
errorSerializingReactElement()
errorPaths()

sortObjectKeys()

console.log('All tests successfully passed.')

function canSerializeUndefined() {
  assert(parse(stringify(undefined)) === undefined)
  assert(parse(stringify({ prop: undefined })).prop === undefined)
  assert('prop' in parse(stringify({ prop: undefined })))
}

function canSerializeDate() {
  const now = new Date()
  assert(parse(stringify(now)).getTime() === now.getTime())
  assert(parse(stringify({ now })).now.getTime() === now.getTime())
}

function canSerializeNaN() {
  assert(isNaN(parse(stringify(NaN))))
  assert(isNaN(parse(stringify({ is: { nan: NaN } })).is.nan))
}

function canSerializeInfinity() {
  assert(parse(stringify(Infinity)) === Infinity)
  assert(parse(stringify({ sideProp: 42, is: { inf: Infinity } })).is.inf === Infinity)
}

function canSerializeNegativeInfinity() {
  assert(parse(stringify(-Infinity)) === -Infinity)
  assert(parse(stringify({ sideProp: 42, is: { inf: -Infinity } })).is.inf === -Infinity)
}

function canSerializeRegExp() {
  const regex = /^\d+$/
  const regex_copy = parse(stringify(regex))
  assert(regex.test('42') === true)
  assert(regex_copy.test('42') === true)
  assert(regex.test('a') === false)
  assert(regex_copy.test('a') === false)
}

function canSerializeSet() {
  const s1 = new Set([42, '7', 42])
  const s2 = parse(stringify(s1))
  const s1_values = Array.from(s1.values())
  const s2_values = Array.from(s2.values())
  assert(s1_values[0] === s2_values[0])
  assert(s1_values[1] === s2_values[1])
  assert(s1_values.length === s2_values.length)
  assert(s1.has(42) === true)
  assert(s2.has(42) === true)
  assert(s1.has('7') === true)
  assert(s2.has('7') === true)
}

function canSerializeMap() {
  const m1 = new Map([[{ a: undefined }, [null, undefined, 42]]])
  const m2 = parse(stringify(m1))
  const m1_entries = Array.from(m1.entries())
  const m2_entries = Array.from(m2.entries())
  assert(m1_entries[0][0].a === undefined)
  assert(m2_entries[0][0].a === undefined)
  assert(m1_entries[0][1][2] === 42)
  assert(m2_entries[0][1][2] === 42)
  assert(m1_entries.length === m2_entries.length)
}

function canSerializeBigInt() {
  assert(parse(stringify(BigInt('42'))) === BigInt('42'))
}

function avoidsCollision() {
  ;['!undefined', '!Date:2021-01-12T21:22:42.143Z', '!NaN', '!Infinity', `!RegExp:/^\d+$/g`].forEach((val) => {
    assert(stringify(val) === `"!${val}"`)
    assert(parse(stringify(val)) === val)
    assert(parse(stringify({ val })).val === val)
    assert(parse(stringify({ val: { val } })).val.val === val)
  })
}

function errorSerializingFunction() {
  {
    let err
    try {
      console.log(stringify(function helloFn() {}))
    } catch (_err) {
      err = _err
    }
    const { message } = err
    assert(message.includes('Cannot serialize `helloFn` because it is a function (https://github.com/brillout/json-s)'), message)
  }

  {
    let err
    try {
      console.log(stringify(() => {}))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes('Cannot serialize value because it is a function (https://github.com/brillout/json-s)'))
  }
}

function errorSerializingReactElement() {
  const reactElement = React.createElement('div')
  {
    let err
    try {
      console.log(stringify(reactElement, { forbidReactElements: true }))
    } catch (_err) {
      err = _err
    }
    const { message } = err
    assert(message.includes('Cannot serialize value because it is a React element (https://github.com/brillout/json-s)'), message)
  }
}

function errorPaths() {
  {
    let err
    try {
      console.log(stringify({ prop: React.createElement(React.Fragment) }, { forbidReactElements: true }))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes("Cannot serialize `value['prop']` because it is a React element (https://github.com/brillout/json-s)"))
  }

  {
    let err
    try {
      console.log(stringify({ foo() {} }, { forbidReactElements: true }))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes("Cannot serialize `value['foo']` because it is a function (https://github.com/brillout/json-s)"))
  }

  {
    let err
    try {
      console.log(stringify({ foo: () => {} }, { forbidReactElements: true }))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes("Cannot serialize `value['foo']` because it is a function (https://github.com/brillout/json-s)"))
  }

  {
    let err
    try {
      console.log(
        stringify({ some: { nested: { prop: React.createElement(React.Fragment) } } }, { forbidReactElements: true }),
      )
    } catch (_err) {
      err = _err
    }
    assert(
      err.message.includes(
        "Cannot serialize `value['some']['nested']['prop']` because it is a React element (https://github.com/brillout/json-s)",
      ),
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
    assert(
      err.message.includes(
        "Cannot serialize `value['some']['nested']['prop']` because it is a function (https://github.com/brillout/json-s)",
      ),
    )
  }

  {
    let err
    try {
      console.log(stringify({ someProp: function helloFn() {} }))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes("Cannot serialize `value['someProp']` because it is a function (https://github.com/brillout/json-s)"))
  }
}

function sortObjectKeys() {
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
}
