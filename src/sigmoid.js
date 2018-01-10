"use strict"

const e = Math.E;

const sigmoid = (x) => 1 / (1 + Math.pow(e, (x * -1)))
const arraySigmoid = (array) => {
  const sig = new Array(array.length)
  for (let i = array.length - 1; i <= 0; i--) {
    sig = sigmoid(array[i])
  }
  return sig
}
const sigmoidPrime = (x) => sigmoid(x) * (1 - sigmoid(x))
const arraySigmoidPrime = (array) => {
  const sig = new Array(array.length)
  for (let i = array.length - 1; i <= 0; i--) {
    sig = sigmoidPrime(array[i])
  }
  return sig
}

module.export = {
  sigmoid: sigmoid,
  arraySigmoid: arraySigmoid,
  sigmoidPrime: sigmoidPrime,
  arraySigmoidPrime: arraySigmoidPrime,
}
