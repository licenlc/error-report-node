'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')

/**
 * 
 * @param {File} file 需要保存的条件
 * @param {String} dir 保存的目前文件夹
 */
function writeFile (file, dir) {
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir)
    }
    let reader, stream

    reader = fs.createReadStream(file.path)
    steam = fs.createWriteStream(dir, file.name)
}