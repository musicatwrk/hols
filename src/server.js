const express = require('express')
const morgan = require('morgan')
const morganConfig = require('./config/morgan.config')
const helmet = require('helmet')
const compression = require('compression')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const csp = require('./config/csp.config')

const app = express()

app
  .use(helmet())
  .use(helmet.contentSecurityPolicy({ directives: csp }))
  // redirect http connections to https (unless localhost:{4 digits}, or 127.0.0.1:{5 digits} (for supertest))
  .use(redirectToHTTPS([/localhost:(\d{4})|127.0.0.1:(\d{5})/], [], 301))
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static('public', { maxage: process.env.NODE_ENV === 'production' ? '3d' : '0' }))
  .use(compression())

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(morgan(morganConfig))

// redirect from the Heroku url to the custom one
app.use((req, res, next) => {
  if (req.headers.host === 'can-hols.herokuapp.com') {
    res.redirect(301, `https://canada-holidays.ca${req.path}`)
  }

  next()
})

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

const icsRouter = require('./routes/ics')
app.use(icsRouter)

const uiRouter = require('./routes/ui')
app.use(uiRouter)

module.exports = app
