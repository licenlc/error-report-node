'use strict'

const fs = require('fs')
const path = require('path')
const moment = require('moment')
const mkdirp = require('mkdirp')
const config = require('config')

const uploadConf = config.get('upload')

module.exports = class UploadController {
    /**
     * source-map文件上传接口
     * 
     * @param {*} ctx 
     */
    static async upload (ctx) {
        console.log('图片上传')
        ctx.body= 'source-map上传接口调试'
        const origin = ctx.request.origin
        const expireDay = uploadConf.expire.day
        const date = moment().format('YYYY-MM-DD')
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
}