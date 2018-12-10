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
    }
})

module.exports = moogoose.model('User', schema)