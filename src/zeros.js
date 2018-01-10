"use strict";

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
}

module.exports = {
  zeroBiases: zeroBiases,
  zeroWeights: zeroWeights,
}
