import { stringify } from '../src/stringify'
import { expect, describe, it } from 'vitest'

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
