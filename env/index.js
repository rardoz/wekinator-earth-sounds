const path = require('path')
const dotenv = require('dotenv')
const { DOT_ENV } = process.env
const envPath = path.resolve(
  process.cwd(),
  `env/.env${DOT_ENV ? `.${DOT_ENV}` : ''}`
)
module.exports = dotenv.config({ path: envPath })
