const { ErrorInfo } = require('../models')

module.exports = class ErrorInfoProxy {
    static create (message, line, column, stack, creatTime, updateTime) {
        const errorInfo = new ErrorInfo()
        errorInfo.message = message
        errorInfo.line = line
        errorInfo.column = column
        errorInfo.stack = stack
        errorInfo.createTime = createTime
        errorInfo.updateTime = updateTime

        return errorInfo.save()
    }

    static update ()
}