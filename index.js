"use strict"

const readline = require('readline')

const dataLoader = require('./src/data')
const nn = require('./src/network')
const _ = require('lodash')

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout)
console.log('Neural Network Training:')

const net = nn.generateNetwork([784, 30, 10])
Promise.all([dataLoader.load('train'), dataLoader.load('test')]).then((data) => {
  nn.stochGradDesc(net, data[0], 30, 10, 3.0, data[1])
}).catch((err) => console.log(err))
