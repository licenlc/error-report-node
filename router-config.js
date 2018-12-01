'use strict'

const Router = require('koa-router')
const { error, upload } = require('./controllers')

const apiRouter = new Router({ prefix: '/report' })

exports.api = apiRouter
  .get('/error', error.create)
  .post('/update', error.update)
  .post('/sourceMap', upload.upload)
  .post('/images', upload.image)
