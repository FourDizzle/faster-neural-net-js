"use strict";

const os = require('os')
const util = require('util')
const fs = require('fs')

const _ = require('lodash')

const open = util.promisify(fs.open)
const read = util.promisify(fs.read)

const isLittleEndian = (os.endianness() === 'LE')

const trainLabels = __dirname + '/../../data/train-labels-idx1-ubyte'
const trainImages = __dirname + '/../../data/train-images-idx3-ubyte'
const testLabels = __dirname + '/../../data/t10k-labels-idx1-ubyte'
const testImages = __dirname + '/../../data/t10k-images-idx3-ubyte'

const swapEndian32 = (val) => {
  return ((val & 0xFF) << 24)
           | ((val & 0xFF00) << 8)
           | ((val >> 8) & 0xFF00)
           | ((val >> 24) & 0xFF)
}

const swapEndian16 = (val) => {
    return ((val & 0xFF) << 8)
           | ((val >> 8) & 0xFF)
}

const swapEndian32Array = (array) => {
  let swapFn = swapEndian32
  return array.map(element => swapFn(element))
}

const getFileLength = (lengthBuffer) => {
  if (isLittleEndian)
    return swapEndian32Array(lengthBuffer)[1]
  else
    return lengthBuffer[1]
}

const loadLabels = (filename) => {
  return open(filename, 'r').then((fd) => {
    return read(fd, new Uint32Array(2), 0, 8, 0).then((buf) => {
      const length = getFileLength(buf.buffer)
      return read(fd, new Uint8Array(length), 0, length, 8)
    }).then((buf) => {
      return buf.buffer
    })
  }).catch((err) => {
    console.log(err)
  })
}

const loadImages = (filename) => {
  return open(filename, 'r').then((fd) => {
    return read(fd, new Uint32Array(4), 0, 16, 0).then((buf) => {
      // length is the number of images and each has 784 pixels
      const length = getFileLength(buf.buffer) * 784
      return read(fd, new Uint8Array(length), 0, length, 16)
    }).then((buf) => {
      return _.chunk(buf.buffer, 784)
    })
  }).catch(err => console.log(err))
}

const loadData = (labelsFilename, imagesFilename) => {
  return Promise.all([loadLabels(labelsFilename), loadImages(imagesFilename)]).then((data) => {
    const labels = data[0]
    const images = data[1]
    return images.map((image, i) => {
      const vectorLabel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      vectorLabel[labels[i]] = 1
      return {
        expectedOutput: vectorLabel,
        label: labels[i],
        input: image,
      }
    })
  }).catch((err) => console.log(err))
}

module.exports = {
  loadData: (type) => {
    if (type === 'train') {
      return loadData(trainLabels, trainImages)
    } else if (type === 'test') {
      return loadData(testLabels, testImages)
    } else {
      return Promise.reject('image data type must either be "train" or "test"')
    }
  },
  
  load: (filename) => {
    
  }
}