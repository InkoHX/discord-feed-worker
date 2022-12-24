import { afterEach, expect, test, vi } from 'vitest'
import { fetcher } from './fetcher'

const mockFetch = vi.fn()

vi.stubGlobal('fetch', mockFetch)

afterEach(() => {
  vi.resetAllMocks()
})

test('fetcher', () => {
  const fakeToken = 'Super ultimate bot token'
  const fetch = fetcher(fakeToken)

  const url = 'https://example.com'
  const body = 'foo'

  fetch('https://example.com', {
    body,
    headers: { Authorization: 'Inject!', 'X-M2U': '紅蓮の唄' },
  })

  expect(mockFetch).toHaveBeenCalledOnce()
  expect(mockFetch).toHaveBeenCalledWith(url, {
    body,
    headers: { Authorization: `Bot ${fakeToken}`, 'X-M2U': '紅蓮の唄' },
  })
})
