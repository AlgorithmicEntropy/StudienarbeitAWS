var fs = require('fs')
const { AWSRequest } = require('./AWSRequest')
const { STATUS_CODE, REQUEST_TIME, GET, TIMESTAMP, PAYLOAD, FUNCTION_TYPE } = require('./const')
const { DataLogger } = require('./DataLogger')
const { sleep } = require('./util')

class RequestScheduler {
  constructor (configPath, baseUrl, apiKey) {
    this._readConfFile(configPath)
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  _readConfFile (path) {
    const confFileContent = fs.readFileSync(path, 'utf8')
    // to array of lines
    let confFileLines = confFileContent.split('\n')
    // trim header
    confFileLines = confFileLines.slice(1, confFileLines.length)

    const instructions = []

    confFileLines.forEach((line) => {
      if (line !== '') {
        const parts = line.split(';')
        parts[1] = parts[1].substr(0, parts[1].length - 1)
        instructions.push(parts.slice(0, 2))
      }
    })
    this.instructions = instructions
  }

  initLogger (loggingDir, fileName, columns) {
    this.columns = columns
    const logger = new DataLogger(loggingDir)
    logger.openNewLogFile(fileName, columns)
    this.logger = logger
  }

  runTest (path) {
    return new Promise((resolve, reject) => {
      if (!this.instructions) {
        throw new Error('No timing instructions found')
      }
      const request = new AWSRequest(this.baseUrl, this.apiKey)

      this.instructions.forEach(async (instruction) => {
        const delay = instruction[0]
        const count = instruction[1]

        for (let i = 0; i < count; i++) {
          await request.callGetAPI(path)
            .then((result) => {
              this._loggResult(result)
            })
          await sleep(delay)
        }
        resolve()
      })
    })
  }

  _loggResult (result) {
    const data = []
    data.push(result[TIMESTAMP])
    data.push(result[STATUS_CODE])
    data.push(result[REQUEST_TIME])
    data.push(result[PAYLOAD].time)
    data.push(GET)
    data.push(result[FUNCTION_TYPE])

    this.logger.appendFile(data)
  }
}

module.exports = { RequestScheduler }
