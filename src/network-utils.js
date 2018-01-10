"use strict"

const math = require('mathjs')

const e = Math.E;

const sigmoid = (x) => 1 / (1 + Math.pow(e, (x * -1)))

const arraySigmoid = (array) => {
  const sig = new Array(array.length)
  for (let i = 0; i < array.length; i++) {
    sig[i] = sigmoid(array[i])
  }
  return sig
}
const sigmoidPrime = (x) => sigmoid(x) * (1 - sigmoid(x))
const arraySigmoidPrime = (array) => {
  const sig = new Array(array.length)
  for (let i = 0; i < array.length; i++) {
    sig[i] = sigmoidPrime(array[i])
  }
  return sig
}

const zeroArray = (size) => {
  const array = new Array(size)
  for (let i = 0; i < size; i++) {
    array[i] = 0
  }
  return array
}

const zeroBiases = (biasModel) => {
  const zeroBias = new Array(biasModel.length)
  for (let i = 0; i < biasModel.length; i++) {
    zeroBias[i] = zeroArray(biasModel[i].length)
  }
  return zeroBias
}

const zeroWeights = (weightModel) => {
  const zeroWeights = new Array(weightModel.length)
  for (let i = 0; i < weightModel.length; i++) {
    const numZeros = weightModel[i][0].length
    zeroWeights[i] = new Array(weightModel[i].length)
    for (let j = 0; j < weightModel[i].length; j++) {
      zeroWeights[i][j] = zeroArray(numZeros)
    }
  }
  return zeroWeights
}

const generateZerosNetwork = (layerSizes) => ({
  biases: layerSizes.slice(1).map((size) => Array.apply(null, Array(size)).map(() => 0)),
  weights: _.zip(layerSizes.slice(0, -1), layerSizes.slice(1)).map((layer) =>
    Array.apply(null, Array(layer[1])).map(() => Array.apply(null, Array(layer[0])).map(() => 0))),
})

const costDeriv = (output, expected) => math.subtract(output, expected)

const addBiases = (b1, b2) => {
  const sum = new Array(b1.length)
  for (let i = 0; i < b1.length; i++) {
    sum[i] = math.add(b1[i], b2[i])
  }
  return sum
}

const subtractBiasesOrWeights = (wb1, wb2) => {
  const diff = new Array(wb1.length)
  for (let i = 0; i < wb1.length; i++) {
    diff[i] = math.subtract(wb1[i], wb2[i])
  }
  return diff
}

const addWeights = (w1, w2) => {
  const sum = new Array(w1.length)
  for (let i = 0; i < w1.length; i++) {
    sum[i] = math.add(w1[i], w2[i])
  }
  return sum
}

const multiplyEachWeightOrBias = (wb, mult) => {
  const prod = new Array(wb.length)
  for (let i = 0; i < wb.length; i++) {
    prod[i] = math.multiply(wb[i], mult)
  }
  return prod
}

module.exports = {
  sigmoid: sigmoid,
  arraySigmoid: arraySigmoid,
  sigmoidPrime: sigmoidPrime,
  arraySigmoidPrime: arraySigmoidPrime,
  zeroBiases: zeroBiases,
  zeroWeights: zeroWeights,
  generateZerosNetwork: generateZerosNetwork,
  costDerivative: costDeriv,
  addBiasesOrWeights: addBiases,
  subtractBiasesOrWeights: subtractBiasesOrWeights,
  multiplyEachWeightOrBias: multiplyEachWeightOrBias,
  addWeights: addWeights,
}
