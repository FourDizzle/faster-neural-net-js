"use strict";

const readline = require('readline')

const _ = require('lodash')
const rvnorm = require('randgen').rvnorm
const math = require('mathjs')

const dataUtil = require('./data')
const netUtil = require('./network-utils')

const getProgressBar = (percentComplete) => {
  const percent = Math.round(percentComplete)
  if (percentComplete < 99) {
    let bar = ""
    for (let i = 1; i <= 50; i++) {
      if (percent - i * 2 >= 0) bar += '='
      else bar += '-'
    }
    return `[${bar}] ${percent}%`
  } else {
    return '[==================================================] 100%'
  }  
}

const generateZerosNetwork = (layerSizes) => ({
  biases: layerSizes.slice(1).map((size) => Array.apply(null, Array(size)).map(() => 0)),
  weights: _.zip(layerSizes.slice(0, -1), layerSizes.slice(1)).map((layer) =>
    Array.apply(null, Array(layer[1])).map(() => Array.apply(null, Array(layer[0])).map(() => 0))),
})

const generateNetwork = (layerSizes) => {
  return {
    numberOfLayers: layerSizes.length,
    layerSizes: layerSizes,
    biases: layerSizes.slice(1).map((size) => rvnorm(size, 0, 1)),
    weights: _.zip(layerSizes.slice(0, -1),
      layerSizes.slice(1)).map((layer) => {
        let layerWeights = [];
        for (let i = 0; i < layer[1]; i++) {
          layerWeights.push(rvnorm(layer[0], 0, 1))
        }
        return layerWeights
    }),
  }
}

const evaluate = (network, testData) => {
  let numCorrect = 0
  for (let i = 0; i < testData.length; i++) {
    let result = feedForward(network, testData[i].input).reduce((val, out, i, vector) => {
      if (out > vector[val]) {
        return i
      } else {
        return val
      }
    }, 0)
    if (result === testData[i].label) {
      numCorrect++
    }
  }
  return numCorrect
}

const backprop = (network, input, expected) => {
  let numLayers = network.numberOfLayers
  let activation = input
  let activations = new Array(numLayers)
  let nablaBiases = netUtil.zeroBiases(network.biases)
  let nablaWeights = netUtil.zeroWeights(network.weights)
  
  activations[0] = input
  let zs = new Array(numLayers - 1)
  
  for (let i = 0; i < numLayers - 1; i++) {
    let z = math.add(math.multiply(network.weights[i], activation), network.biases[i])
    zs[i] = z
    activation = netUtil.arraySigmoid(z)
    activations[i + 1] = activation
  }
  
  let delta = math.dotMultiply(
    netUtil.costDerivative(activations[numLayers - 1], expected),
    netUtil.arraySigmoidPrime(zs[numLayers - 2])
  )
  nablaBiases[nablaBiases.length - 1] = delta
  nablaWeights[nablaWeights.length - 1] = 
    math.multiply(delta, math.transpose(activations[numLayers - 1]))
    
  for (let i = 0; i < numLayers - 2; i++) {
    let z = zs[zs.length - 2 - i]
    let sp = netUtil.arraySigmoidPrime(z)
    delta = math.dotMultiply(
      math.multiply(math.transpose(network.weights[numLayers - 2 - i]), delta),
      sp)
    nablaBiases[numLayers - 3 - i] = delta
    nablaWeights[numLayers - 3 - i] = 
      math.multiply(delta, math.transpose(activations[numLayers - 2 - i]))
  }
  
  return {
    biases: nablaBiases,
    weights: nablaWeights,
  }
}

const feedForward = (network, input) => _.zip(network.weights, network.biases)
  .reduce((activation, layer, i) => {
    const weights = layer[0]
    const biases = layer[1]
    return math.add(math.multiply(weights, activation), biases)
      .map((val) => netUtil.sigmoid(val))
  }, input)
  
const updateToMiniBatch = (network, miniBatch, eta) => {
  let batchLength = miniBatch.length
  let nablaBiases = netUtil.zeroBiases(network.biases)
  let nablaWeights = netUtil.zeroWeights(network.weights)
  let deltaNet = { weights: [], biases: [] }
  
  for (let i = 0; i < miniBatch.length; i++) {
    deltaNet = backprop(network, miniBatch[i].input, miniBatch[i].expectedOutput)
    nablaBiases = netUtil.addBiasesOrWeights(nablaBiases, deltaNet.biases)
    nablaWeights = netUtil.addBiasesOrWeights(nablaWeights, deltaNet.weights)
  }
  
  let mult = eta / batchLength
  network.weights = 
    netUtil.subtractBiasesOrWeights(network.weights, 
      netUtil.multiplyEachWeightOrBias(nablaWeights, mult))
  network.biases = 
    netUtil.subtractBiasesOrWeights(network.biases, 
      netUtil.multiplyEachWeightOrBias(nablaBiases, mult))
  return network
}

const stochGradDesc =
  (network, trainingData, numEpochs, miniBatchSize, learningRate, options) => {
    let epoch = []
    let percentComplete = 0;
    
    for (let i = 0; i < numEpochs; i++) {
      console.log(`Starting Epoch ${i + 1}`)
      epoch = dataUtil.generateEpoch(trainingData, miniBatchSize)
      const updateInterval = Math.round(epoch.length / 110)
      process.stdout.write(getProgressBar(0))
      for (let j = 0; j < epoch.length; j++) {
        network = updateToMiniBatch(network, epoch[j], learningRate)
        // Display progress
        if (j % updateInterval === 0 || j === epoch.length - 1) {
          percentComplete = (j / epoch.length) * 100
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(getProgressBar(percentComplete))
        }
      }
      process.stdout.write('\n')
      
      // Save after every iteration incase process is interrupted
      if (options && options.recoveryFile) {
        dataUtil.saveNeuralNet(options.recoveryFile, network)
      }
      
      if (options && options.testData) {
        let success = evaluate(network, options.testData)
        console.log(`Epoch ${i + 1}: ${success}/${testData.length}`)
      } else {
        console.log(`Epoch ${i + 1} complete`)
      }
      process.stdout.write('\n')
    }
    return network
}

module.exports = {
  generateNetwork: generateNetwork,
  feedForward: feedForward,
  stochGradDesc: stochGradDesc,
  updateToMiniBatch: () => {}
}
