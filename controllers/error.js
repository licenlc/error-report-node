'use strict'

const _ = require('lodash')
const fs = require('fs')
const config = require('config')
const sourceMap = require('source-map')
const mapDir = config.get('upload')

module.exports = class ErrorController {
    /**
     * 新增异常信息
     */
    static async create (ctx) {
        const query = ctx.query
        const line = parseInt(query.line)
        const column = parseInt(query.column)
        let url = query.url
        const sourcemap = query.sourcemap
        console.log('query.url:', query)
        // sourcemap 为true时，需要先解析,前端传递过来，加快解析速度
        if (sourcemap && url) {
            const fileUrl = url.slice(url.lastIndexOf('/')) + '.map'
            let dist = (mapDir.dir +'/' + query.date + fileUrl).replace('..', '.')
            console.log('fileUrl:', dist)
            let sm = new sourceMap.SourceMapConsumer(fs.readFileSync(dist, 'utf-8'))
            sm.then((resutlInfo) => {
                let result = resutlInfo.originalPositionFor({
                    line: line,
                    column: column
                })
                console.log('解析结果：', result)
            }, (reject) => {
                console.log('yichang')
            })
        } else {

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