function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getHumanDate () {
  let date = new Date().toISOString()
  date = date.substring(0, date.length - 5)
  date = date.replace('T', '_')
  date = date.replace(':', '-')
  date = date.replace(':', '-')
  return date
}

module.exports = {
  sleep,
  getHumanDate
}
