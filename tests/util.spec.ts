import * as util from '@/util'

describe('numToString function', () => {
  it('should return number as string', () => {
    const sample = util.numToString(1234)
    expect(sample).toBe('1234')
  })

  it('should be blank string when NaN is passed', () => {
    const sample = util.numToString(NaN)
    expect(sample).toBe('')
  })
})

describe('shuffleArray function', () => {
  it('should return a different ordered array', () => {
    const ary = ['a', 'b', 'c']
    const sample = util.shuffleArray<string>(ary)

    expect(sample.length).toBe(3)
    expect(sample.sort().join('')).toBe('abc')
  })
})

describe('sortArray Function', () => {
  it('should return the descending sorted array compared with values of passed key', () => {
    const data = [
      { id: 0, dataKey: -1 },
      { id: 1, dataKey: '100' },
      { id: 2, dataKey: 99 },
      { id: 3, dataKey: 1467 },
      { id: 4, dataKey: 0 },
    ]

    const expected = [
      { id: 3, dataKey: 1467 },
      { id: 1, dataKey: '100' },
      { id: 2, dataKey: 99 },
      { id: 4, dataKey: 0 },
      { id: 0, dataKey: -1 },
    ]

    const sample = util.sortArray(data, 'dataKey')
    expect(sample).toStrictEqual(expected)
  })

  it('should do nothing when the specified key has a NaN of undefined value', () => {
    type TestData = { id: number; dataKey?: number | string }

    const data = [
      { id: 0, dataKey: 'abc' },
      { id: 1, dataKey: 123 },
      { id: 2, dataKey: 999 },
      { id: 3 },
      { id: 4, dataKey: 999 },
      { id: 5 },
      { id: 6, dataKey: 9 },
    ]

    const expected = [
      { id: 0, dataKey: 'abc' },
      { id: 2, dataKey: 999 },
      { id: 4, dataKey: 999 },
      { id: 1, dataKey: 123 },
      { id: 3 },
      { id: 5 },
      { id: 6, dataKey: 9 },
    ]

    const sample = util.sortArray<TestData>(data.concat(), 'dataKey')
    expect(sample).toStrictEqual(expected)
  })
})

describe('toBoolean function', () => {
  it('should return true when "true" is passed', () => {
    const sample = util.toBoolean('true')
    expect(sample).toBe(true)
  })

  test('should return false in other cases', () => {
    const sample = util.toBoolean('other strings')
    expect(sample).toBe(false)
  })
})

describe('initSerialNumArray function', () => {
  it('should return an array which has serial numbers with the specified length', () => {
    const sample = util.initSerialNumArray(5)
    const expected = [0, 1, 2, 3, 4]
    expect(sample).toStrictEqual(expected)
  })
})
