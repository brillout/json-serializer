import { parse } from '../src/parse'
import { stringify } from '../src/stringify'
import { describe, it } from 'vitest'
import assert from 'assert'

describe('serialize', () => {
  it('undefined', () => {
    assert(parse(stringify(undefined)) === undefined)
    assert(parse(stringify({ prop: undefined })).prop === undefined)
    assert('prop' in parse(stringify({ prop: undefined })))
  })
  it('Date', () => {
    const now = new Date()
    assert(parse(stringify(now)).getTime() === now.getTime())
    assert(parse(stringify({ now })).now.getTime() === now.getTime())
  })
  it('NaN', () => {
    assert(isNaN(parse(stringify(NaN))))
    assert(isNaN(parse(stringify({ is: { nan: NaN } })).is.nan))
  })
  it('Infinity', () => {
    assert(parse(stringify(Infinity)) === Infinity)
    assert(parse(stringify({ sideProp: 42, is: { inf: Infinity } })).is.inf === Infinity)
  })
  it('Negative Infinity', () => {
    assert(parse(stringify(-Infinity)) === -Infinity)
    assert(parse(stringify({ sideProp: 42, is: { inf: -Infinity } })).is.inf === -Infinity)
  })
  it('RegExp', () => {
    const regex = /^\d+$/
    const regex_copy = parse(stringify(regex))
    assert(regex.test('42') === true)
    assert(regex_copy.test('42') === true)
    assert(regex.test('a') === false)
    assert(regex_copy.test('a') === false)
  })
  it('Set', () => {
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
  })
  it('Map', () => {
    const m1 = new Map([[{ a: undefined }, [null, undefined, 42]]])
    const m2 = parse(stringify(m1))
    const m1_entries = Array.from(m1.entries())
    const m2_entries = Array.from(m2.entries())
    assert(m1_entries[0][0].a === undefined)
    assert(m2_entries[0][0].a === undefined)
    assert(m1_entries[0][1][2] === 42)
    assert(m2_entries[0][1][2] === 42)
    assert(m1_entries.length === m2_entries.length)
  })
  it('BigInt', () => {
    assert(parse(stringify(BigInt('42'))) === BigInt('42'))
  })
})
