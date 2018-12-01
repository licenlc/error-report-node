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
    createTime: {
        type: Date
    },
    updateTime: {
        type: Date
    }
})

module.exports = moogoose.model('ErrorInfo', schema)