'use strict'

const _ = require('lodash')
const config = require('config')

module.exports = class UserController{

    /**
     * 用户注册
     * @param Object ctx
     */
    static async register (ctx) {
       const name = ctx.checkBady('name').notEmpty().value
       const password = ctx.checkBody('password').notEmpty().value
       if (ctx.errors) {
           ctx.body()
       }
    }
}