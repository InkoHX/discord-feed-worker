import { expect, test } from 'vitest'
import { isEnabled } from './env'

test('isEnabled', () => {
  expect(isEnabled('  　On  　')).toBeTruthy()
  expect(isEnabled('　　 0N　  ')).toBeFalsy()
  expect(isEnabled(void 0)).toBeFalsy()
})
