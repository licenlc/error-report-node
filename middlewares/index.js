'use strict'

const config = require('config')
const ipFilter = require('ip-filter')

const blackIPs = config.get('blackList.ips')

const codeMap = {
  '-1': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
}

const utilFn = {
  success (data) {
    return {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null
    }
  },
  fail (message, code, data) {
    return {
      code: code || -1,
      success: false,
      message: message || codeMap[code],
      data: data || null
    }
  }
}

module.exports = class Middleware {
  static util (ctx, next) {
    ctx.set('X-Request-Id', ctx.req.id)
    ctx.util = utilFn
    return next()
  }

  static ipFilter (ctx, next) {
    if (ipFilter(ctx.ip, blackIPs, {strict: false})) {
      ctx.body = utilFn.refail('请求频率太快，已被限制访问')
      return
    }
    return next()
  }
}
