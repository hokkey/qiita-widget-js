'use strict'
exports.__esModule = true
exports.initSerialNumArray = exports.toBoolean = exports.sortArray = exports.shuffleArray = exports.numToString = void 0
function numToString(num) {
  if (Number.isNaN(num)) return ''
  return '' + num
}
exports.numToString = numToString
function shuffleArray(source) {
  var array = source.concat()
  var n = array.length
  while (n) {
    var i = Math.floor(Math.random() * n--)
    var t = array[n]
    array[n] = array[i]
    array[i] = t
  }
  return array
}
exports.shuffleArray = shuffleArray
function sortArray(source, sortKey) {
  return source.sort(function (a, b) {
    var aVal = a[sortKey]
    var bVal = b[sortKey]
    var _a = [aVal, bVal].map(function (val) {
        if (typeof val === 'string') {
          return parseInt(val, 10)
        }
        if (typeof val === 'number') {
          return val
        }
        return NaN
      }),
      asc = _a[0],
      bsc = _a[1]
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
    .map(function (v, i) {
      return i
    })
}
exports.initSerialNumArray = initSerialNumArray
