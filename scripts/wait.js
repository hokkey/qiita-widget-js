const fs = require('fs')
const path = require('path')
const process = require('process')

function getFile(path, retryCount) {
  return new Promise((resolve, reject) => {
    const intervalTimer = setInterval(() => {
      const file = path

      try {
        console.log('Checking for: ', file)
        const fileExists = fs.statSync(file)
        console.log('Exists: ', true)
        clearInterval(intervalTimer)
        clearTimeout(timeoutTimer)
        resolve()
      } catch (e) {
        console.log('Exists: ', false)
      }
    }, 1000)

    const timeoutTimer = setTimeout(() => {
      clearTimeout(timeoutTimer)
      clearInterval(intervalTimer)
      reject(new Error('timeout'))
    }, 1000 * retryCount)
  })
}

const filePath = process.argv[2]
if (!filePath) return

getFile(path.resolve(__dirname, '../', filePath), 5).catch((reason) => {
  console.error(reason)
})
