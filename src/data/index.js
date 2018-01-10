const loader = require('./data-loader')
const batchUtil = require('./batch-util')
const network = require('./network-file')

module.exports = {
  load: loader.loadData,
  generateEpoch: batchUtil.generateEpoch,
  openNeuralNet: network.load,
  saveNeuralNet: network.save,
}
