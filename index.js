"use strict"

const readline = require('readline')

const dataLoader = require('./src/data')
const nn = require('./src/network')
const _ = require('lodash')

const saveDir = '/Users/ncassiani/Projects/NeuralNetwork/saved-neural-nets/'
const beforeTraining = 'before-training.json'
const afterTraining = 'after-training.json'

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout)
console.log('Neural Network Training:')

const net = nn.generateNetwork([784, 30, 10])

dataLoader.saveNeuralNet(saveDir + beforeTraining, net).then(() => {
  return Promise.all([dataLoader.load('train'), dataLoader.load('test')])
}).then((data) => {
  return nn.stochGradDesc(net, data[0], 30, 10, 5.0, { trainingData:data[1] })
}).then((trainedNet) => {
  return dataLoader.saveNeuralNet(saveDir + afterTraining, trainedNet)
}).catch((err) => console.log(err))
