import { Api } from '@/Api'

describe('Fetch API fallback', () => {
  it('throws Error when Fetch API is not available', (): void => {
    expect(() => {
      new Api()
    }).toThrow('This browser does not have Fetch API.')
  })
})
