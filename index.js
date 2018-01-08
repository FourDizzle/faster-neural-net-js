const dataLoader = require('./src/data-loader')
const nn = require('./src/network')
const _ = require('lodash')

const net = nn.generateNetwork([784, 30, 10])
dataLoader.loadData('train').then((data) => {
  const output = nn.feedForward(net, data[2].pixels)
  console.log('output: ', output)
  console.log('input: ', data[2].vectorLabel)
}).catch(err => console.log(err))