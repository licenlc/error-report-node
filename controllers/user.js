'use strict'

const _ = require('lodash')
const config = require('config')

module.exports = class UserController{

    /**
     * 测试接口
     * 
     * @param {*} ctx 
     */
    static async testRegister (ctx) {
        const name = ctx.checkQuery('name').notEmpty('用户名不能为空').value
        const password = ctx.checkQuery('password').notEmpty('密码不能为空').len(8, 20, '密码为8到20位').value
        console.log(`name:${name} password:${password}`)
        if (ctx.errors) {
            ctx.body = ctx.util.fail(null, 10001, ctx.errors)
            return
        }
        ctx.body = ctx.util.success()
    }
    /**
     * 用户注册
     * @param Object ctx
     */
    static async register (ctx) {
       const name = ctx.checkBody('name').notEmpty('用户名不能为空').value
       const password = ctx.checkBody('password').notEmpty('密码不能为空').value
       if (ctx.errors) {
           ctx.body = ctx.uitl.refail(null, 10001, ctx.errors)
           return
       }
    }

    /**
     * 用户登录
     */
    static async login (ctx) {
        
    }
}