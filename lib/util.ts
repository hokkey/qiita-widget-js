export function numToString(num: number): string {
  if (Number.isNaN(num)) return ''
  return `${num}`
}

export function shuffleArray<T>(source: T[]): T[] {
  const array = source.concat()

  let n: number = array.length

  while (n) {
    const i = Math.floor(Math.random() * n--)
    const t = array[n]
    array[n] = array[i]
    array[i] = t
  }

  return array
}

export function sortArray<T>(source: T[], sortKey: keyof T): T[] {
  return source.sort((a, b): number => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]

    const [asc, bsc] = [aVal, bVal].map((val) => {
      if (typeof val === 'string') {
        return parseInt(val, 10)
      }
      if (typeof val === 'number') {
        return val
      }
      return NaN
    })

    if (Number.isNaN(asc) || Number.isNaN(bsc)) {
      return 0
    }

    if (asc < bsc) return 1
    if (asc > bsc) return -1
    return 0
  })
}

export function toBoolean(str: string): boolean {
  return str.toLowerCase() === 'true'
}

export function initSerialNumArray(length: number): number[] {
  return Array(length)
    .fill(0)
    .map((v: number, i: number) => i)
}
