const axios = require('axios').default
const { STATUS_CODE, REQUEST_TIME, TIMESTAMP, PAYLOAD, FUNCTION_TYPE } = require('./const')

class AWSRequest {
  constructor (baseURL, apiKey) {
    this.result = null
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        'x-api-key': apiKey
      }
    })
  }

  callGetAPI (path) {
    return new Promise((resolve, reject) => {
      let requestDuration = null
      let payload = null
      let status = null

      const startTime = new Date().getTime()
      this.instance.get(path)
        .then((response) => {
          requestDuration = new Date().getTime() - startTime
          console.log('request done, path: ' + path)
          console.log(response.data)
          payload = response.data
          status = response.status
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
        .finally(function () {
          const result = {}
          result[TIMESTAMP] = startTime
          result[REQUEST_TIME] = requestDuration
          result[PAYLOAD] = payload
          result[STATUS_CODE] = status
          result[FUNCTION_TYPE] = path
          resolve(result)
        })
    })
  }
}

module.exports = { AWSRequest }
