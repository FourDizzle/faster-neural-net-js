"use strict"

const fs = require('fs')
const util = require('util')

const open = util.promisify(fs.open)
const read = util.promisify(fs.readFile)
const write = util.promisify(fs.write)

const saveNeuralNetToFile = (filename, network) => {
  return open(filename, 'w')
    .then((fd) => write(fd, JSON.stringify(network), 0))
    .catch((err) => console.log(err))
}

const loadNeuralNetFromFile = (filename) => {
  return read(filename).then(data => {
    return JSON.parse(data)
  }).catch(err => console.log(err))
}

module.exports = {
  save: saveNeuralNetToFile,
  load: loadNeuralNetFromFile,
}
