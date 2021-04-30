const { sleep, getHumanDate } = require('./util')
require('dotenv').config()
const { RequestScheduler } = require('./RequestScheduler')
const {
  TIMESTAMP,
  STATUS_CODE,
  REQUEST_TIME,
  SERVER_TIME,
  REQUEST_TYPE,
  FUNCTION_TYPE,
  COMPUTE_NODE_URL,
  COMPUTE_PYTHON_URL,
  FIB_NODE_URL,
  TIMING_CONFIG_PATH,
  FIB_PYTHON_URL
} = require('./const')

const COLUMNS = [TIMESTAMP, STATUS_CODE, REQUEST_TIME, SERVER_TIME, REQUEST_TYPE, FUNCTION_TYPE]

// read env
const apiBasePath = process.env.AWS_API_BASE_URL
const apiKey = process.env.API_KEY

if (!apiBasePath || !apiKey) {
  console.error('Missing env config')
  process.exit(1)
}

const scheduler = new RequestScheduler(TIMING_CONFIG_PATH, apiBasePath, apiKey)
scheduler.initLogger('./logs/', getHumanDate(), COLUMNS)
scheduler.runTest(COMPUTE_NODE_URL)
  .then(scheduler.runTest(COMPUTE_PYTHON_URL))
  .then(scheduler.runTest(FIB_NODE_URL))
  .then(scheduler.runTest(FIB_PYTHON_URL))

sleep(5000)
