function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function syncSleep (ms) {
  var start = new Date().getTime(); var expire = start + ms
  while (new Date().getTime() < expire) { }
}

function getHumanDate () {
  let date = new Date().toISOString()
  date = date.substring(0, date.length - 5)
  date = date.replace('T', '_')
  date = date.replace(':', '-')
  date = date.replace(':', '-')
  return date
}

function makeRangeIterator (start = 0, end = Infinity, step = 1) {
  let nextIndex = start
  let iterationCount = 0

  const rangeIterator = {
    next: function () {
      let result
      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step
        iterationCount++
        return result
      }
      return { value: iterationCount, done: true }
    }
  }
  return rangeIterator
}

module.exports = {
  sleep,
  getHumanDate,
  makeRangeIterator,
  syncSleep
}
