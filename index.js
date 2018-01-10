"use strict"

const readline = require('readline')

const dataLoader = require('./src/data')
const nn = require('./src/network')
const _ = require('lodash')

const saveDir = '/Users/ncassiani/Projects/NeuralNetwork/saved-neural-nets/'
const beforeTraining = 'before-training.json'
const afterTraining = 'after-training.json'
const recovery = saveDir + 'training-recovery.json'

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout)
console.log('Neural Network Training:')

const net = nn.generateNetwork([784, 30, 10])

dataLoader.saveNeuralNet(saveDir + beforeTraining, net).then(() => {
  return Promise.all([dataLoader.mnistLoad('train'), dataLoader.mnistLoad('test')])
}).then((data) => {
  return nn.stochGradDesc(net, data[0], 30, 10, 5.0, { testData: data[1], recoveryFile: recovery})
}).then((trainedNet) => {
  return dataLoader.saveNeuralNet(saveDir + afterTraining, trainedNet)
}).catch((err) => console.log(err))
