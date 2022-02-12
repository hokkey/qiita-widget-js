'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.initSerialNumArray =
  exports.toBoolean =
  exports.sortArray =
  exports.shuffleArray =
  exports.numToString =
    void 0
function numToString(num) {
  if (Number.isNaN(num)) return ''
  return `${num}`
}
exports.numToString = numToString
function shuffleArray(source) {
  const array = source.concat()
  let n = array.length
  while (n) {
    const i = Math.floor(Math.random() * n--)
    const t = array[n]
    array[n] = array[i]
    array[i] = t
  }
  return array
}
exports.shuffleArray = shuffleArray
function sortArray(source, sortKey) {
  return source.sort((a, b) => {
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
exports.sortArray = sortArray
function toBoolean(str) {
  return str.toLowerCase() === 'true'
}
exports.toBoolean = toBoolean
function initSerialNumArray(length) {
  return Array(length)
    .fill(0)
    .map((v, i) => i)
}
exports.initSerialNumArray = initSerialNumArray
