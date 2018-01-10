"use strict"

const math = require('mathjs')

const sig = require('./sigmoid')
const zero = require('./zeros')

const costDeriv = (output, expected) => math.subtract(output, expected)

const backprop = (network, input, expected) => {
  let numLayers = network.numberOfLayers
  let activation = input
  let activations = new Array(numLayers)
  let nablaBiases = zero.zeroBiases(network.biases)
  let nablaWeights = zero.zeroWeights(network.weights)
  
  activations[0] = input
  let zs = new Array(numLayers - 1)
  
  for (let i = 0; i < numLayers - 1; i++) {
    let z = math.add(math.multiply(network.weights[i], activation), network.biases[i])
    zs[i] = z
    activation = sig.arraySigmoid(z)
    activations[i + 1] = activation
  }
  
  let delta = math.multiply(
    costDeriv(activations[numLayers - 1], expected),
    sig.arraySigmoidPrime(zs[numLayers - 2])
  )
  nablaBiases[nablaBiases.length - 1] = delta
  nablaWeights[nablaWeights.length - 1] = 
    math.multiply(delta, math.transpose(activations[numLayers - 1]))
    
  for (let i = 0; i < numLayers - 2; i++) {
    let z = zs[zs.length - 2 - i]
    let sp = sig.arraySigmoidPrime(z)
    delta = 
      math.multiply(
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

module.exports = {
  backprop: backprop,
}
