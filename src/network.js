const _ = require('lodash')
const rvnorm = require('randgen').rvnorm
const math = require('mathjs')

const e = Math.E;
const sigmoid = (x) => 1 / (1 + Math.pow(e, (x * -1)))
const sigmoidPrime = (x) => sigmoid(x) * (1 - sigmoid(x))

const generateNetwork = (layerSizes, weights, biases) => {
  return {
    numberOfLayers: layerSizes.length,
    layerSizes: layerSizes,
    biases: biases ? biases : layerSizes.slice(1).map((size) => rvnorm(size, 0, 1)),
    weights: weights ? weights : _.zip(layerSizes.slice(0, -1),
      layerSizes.slice(1)).map((layer) => {
        let layerWeights = [];
        for (let i = 0; i < layer[1]; i++) {
          layerWeights.push(rvnorm(layer[0], 0, 1))
        }
        return layerWeights
    }),
  }
}

const feedForward = (network, input) => _.zip(network.weights, network.biases)
  .reduce((activation, layer, i) => {
    const weights = math.matrix(layer[0])
    const biases = math.matrix(layer[1])
    return math.add(math.multiply(weights, activation), biases)
      .map((val) => sigmoid(val))
  }, input)

const stochGradDesc =
  (network, trainingData, epochs, miniBatchSize, eta, testData) => {
    
}

module.exports = {
  generateNetwork: generateNetwork,
  feedForward: feedForward,
}
