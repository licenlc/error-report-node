'use strict'

const Router = require('koa-router')
const { error, upload, user } = require('./controllers')

const apiRouter = new Router({ prefix: '/report' })

exports.api = apiRouter
  .get('/error', error.create)
  .post('/update', error.update)
  .post('/sourceMap', upload.upload)
  .post('/images', upload.image)
  .get('/uqzip', upload.uncompress)
  .get('/userAgent', upload.userAgent)
  .post('/register', user.register)
  .get('/test', user.testRegister)
