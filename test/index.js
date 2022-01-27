const assert = require('assert')
const { parse, stringify } = require('../')
const React = require('react')

canSerializeUndefined()
canSerializeDate()
canSerializeNaN()
canSerializeInfinity()
canSerializeNegativeInfinity()
canSerializeRegExp()
avoidsCollision()
errorSerializingFunction()
errorSerializingReactElement()
errorPaths()

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
    assert(err.message.includes('[@brillout/json-s] Cannot serialize `helloFn` because it is a function'))
  }

  {
    let err
    try {
      console.log(stringify(() => {}))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes('Cannot serialize value because it is a function'))
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
    assert(err.message.includes('[@brillout/json-s] Cannot serialize value because it is a React element'))
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
    assert(err.message.includes("[@brillout/json-s] Cannot serialize `value['prop']` because it is a React element"))
  }

  {
    let err
    try {
      console.log(stringify({ foo() {} }, { forbidReactElements: true }))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes("[@brillout/json-s] Cannot serialize `value['foo']` because it is a function"))
  }

  {
    let err
    try {
      console.log(stringify({ foo: () => {} }, { forbidReactElements: true }))
    } catch (_err) {
      err = _err
    }
    assert(err.message.includes("[@brillout/json-s] Cannot serialize `value['foo']` because it is a function"))
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
        "[@brillout/json-s] Cannot serialize `value['some']['nested']['prop']` because it is a React element",
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
        "[@brillout/json-s] Cannot serialize `value['some']['nested']['prop']` because it is a function",
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
    assert(err.message.includes("[@brillout/json-s] Cannot serialize `value['someProp']` because it is a function"))
  }
}
