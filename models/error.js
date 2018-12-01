'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    message: {
        type: String
    },
    line: {
        type: String
    },
    column: {
        type: String
    },
    stack: {
        type: String
    },
    // 解析source-map专有
    souce: {
        type: String
    },
    // 解析source-map专有
    name: {
        type: String
    },
    count: {
        type: Number
    },
    createTime: {
        type: Date
    },
    updateTime: {
        type: Date
    }
})

module.exports = moogoose.model('ErrorInfo', schema)