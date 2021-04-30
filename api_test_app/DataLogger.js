var fs = require('fs')
var path = require('path')

class DataLogger {
  constructor (logDirPath) {
    this.logDirPath = logDirPath
  }

  openNewLogFile (name, columns) {
    const fullName = name + '.csv'
    const fullPath = path.join(this.logDirPath, fullName)

    columns.push('\n')

    fs.writeFile(fullPath, columns.join(';'), (err) => {
      if (err) throw err
    })
    this.filePath = fullPath
  }

  appendFile (data) {
    data.push('\n')
    const dataString = data.join(';')
    fs.appendFileSync(this.filePath, dataString)
  }
}

module.exports = { DataLogger }
