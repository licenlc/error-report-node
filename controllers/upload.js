'use strict'

const fs = require('fs')
const path = require('path')
const moment = require('moment')
const mkdirp = require('mkdirp')
const config = require('config')
const compress = require('compressing')

const uploadConf = config.get('upload')

const TYPE = {tar: 'tar', gzip: 'gzip', tgz: 'tgz', zip: 'zip'}

module.exports = class UploadController {

    static async userAgent (ctx) {
        console.log(ctx.query)
    }

    /**
     * source-map文件上传接口
     * @param {*} ctx 
     */
    static async upload (ctx) {
        console.log('source-map 上传')
        ctx.body= 'source-map上传接口调试'
        const origin = ctx.request.origin
        const expireDay = uploadConf.expire.day
        let date
        if (ctx.date) {
            date = ctx.date
        } else {
            date = moment().format('YYYY-MM-DD')
        }
        const files = ctx.request.files
        const uploadDir = path.resolve(__dirname, uploadConf.dir, date)
        if (!fs.existsSync(uploadDir)) {
            mkdirp.sync(uploadDir)
        }
        let reader, stream
        for (let key in files) {
            reader = fs.createReadStream(files[key].path)
            stream = fs.createWriteStream(path.join(uploadDir, files[key].name))
            reader.pipe(stream)
        }
    }

    /**
     * 图片上传接口
     * 
     * @param {*} ctx 
     */
    static async image (ctx) {
        console.log('图片上传')
        ctx.body= '图片上传接口调试'
        const origin = ctx.request.origin
        const expireDay = uploadConf.expire.day
        const date = moment().format('YYYY-MM-DD')
        const files = ctx.request.files
        const uploadDir = path.resolve(__dirname, uploadConf.imageDir, date)
        if (!fs.existsSync(uploadDir)) {
            mkdirp.sync(uploadDir)
        }
        let reader, stream
        for (let key in files) {
            reader = fs.createReadStream(files[key].path)
            stream = fs.createWriteStream(path.join(uploadDir, files[key].name))
            reader.pipe(stream)
        }
    }

    /**
     * 
     * 解压文件，提供给解压soucemap文件使用
     * 
     * @param {*} ctx 
     */
    static async uncompress (ctx) {
        const query = ctx.query
        const time = query.time
        const filename = query.filename
        console.log(query.type, TYPE[query.type])
        const type = TYPE[query.type] || 'tar'
        const dist = (path.join(uploadConf.dirRead, time)) + '/'+ filename
        console.log('dist:', dist)
        try {
            await compress.zip.uncompress(dist, path.join(uploadConf.dirRead, time))
        } catch (e) {
            ctx.body = "解压失败"
        }
    }
}