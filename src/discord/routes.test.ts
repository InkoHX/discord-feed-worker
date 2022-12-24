import { describe, expect, it } from 'vitest'
import { API_VERSION, routes } from './routes'

describe('routes', () => {
  it('API version must be 10', () => {
    expect(API_VERSION).toBe(10)
  })

  it('base url', () => {
    expect(routes.base.toString(), `https://discord.com/api/v${API_VERSION}/`)
  })

  it('Correct message route', () => {
    expect(routes.message('351992405831974915').toString()).toBe(
      `https://discord.com/api/v${API_VERSION}/channels/351992405831974915/messages`
    )
  })

  it('Correct crosspost route', () => {
    expect(
      routes.corsspost('351992405831974915', '391390986770710528').toString()
    ).toBe(
      `https://discord.com/api/v${API_VERSION}/channels/351992405831974915/messages/391390986770710528/crosspost`
    )
  })

  it('Correct thread route', () => {
    expect(
      routes.thread('351992405831974915', '391390986770710528').toString()
    ).toBe(
      `https://discord.com/api/v${API_VERSION}/channels/351992405831974915/messages/391390986770710528/threads`
    )
  })
})
