"use strict"

const fs = require('fs')
const util = require('util')

const read = util.promisify(fs.readFile)

module.exports = {
  load: (filename) => {
    return read(filename).then(data => {
      return JSON.parse(data)
    }).catch(err => console.log(err))
  }
}