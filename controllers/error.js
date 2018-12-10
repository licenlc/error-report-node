'use strict'

const _ = require('lodash')
const fs = require('fs')
const config = require('config')
const sourceMap = require('source-map')
const mapDir = config.get('upload')

module.exports = class ErrorController {
    /**
     * 新增异常信息，提供给浏览器端使用
     */
    static async create (ctx) {
        const query = ctx.query
        console.log('query:', query)
        const message = ctx.checkQuery(ctx.message).notEmpty()
        console.log('message:', message)
        const line = parseInt(query.line)
        const column = parseInt(query.column)
        let url = query.url
        let date = query.date
        const sourcemap = query.m
        // sourcemap 为true时，需要先解析,前端传递过来，加快解析速度
        if (sourcemap === '1' && url) {
            const fileUrl = url.slice(url.lastIndexOf('/js'), url.indexOf('.js')) + '.js.map'
            console.log('截取的fileUrl:', fileUrl)
            let dist = `${mapDir.dirRead}/${date}/${query.project}${fileUrl}`
            console.log('拼接的fileUrl:', dist)
            try {
                let sm = new sourceMap.SourceMapConsumer(fs.readFileSync(dist, 'utf-8'))
                sm.then((resutlInfo) => {
                    let result = resutlInfo.originalPositionFor({
                        line: line,
                        column: column
                    })
                    console.log('解析结果：', JSON.stringify(result))
                }, (reject) => {
                    console.log('解析错误')
                })
            } catch (e) {
                console.log('解析文件异常')
                console.log(e)
            }
        } else {
            // console.log(JSON.stringify(query))
        }
        ctx.body = '测试成功1111'
    }

    /**
     * 更新异常信息，可能之前发生过
     */
    static async update (ctx) {
        ctx.body = 'update'
    }

    /**
     * 查询日志信息,提供给日志查看系统使用
     */
    static async query (ctx) {
        
    }
}