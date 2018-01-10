const loader = require('./mnist-loader')
const batchUtil = require('./batch-util')
const network = require('./network-file')
const training = require('./training-data-loader')

module.exports = {
  mnistLoad: loader.loadData,
  generateEpoch: batchUtil.generateEpoch,
  openNeuralNet: network.load,
  saveNeuralNet: network.save,
  loadTrainingData: training.load,
}
