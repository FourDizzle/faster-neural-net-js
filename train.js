#!/usr/bin/env node

const program = require('commander')

const parseLayers = (layerString) => {
  return layerString.split(',')
}

program
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-s, --save <file>', 'Location to save trained network when finished')
  .option('-n, --network <file>', 'Location of existing network to continue training')
  .option('-l, --layers <layers>', 'A comma separated list of the number of neurons per layer', parseLayers)
  .option('-d, --training-data <file>', 'Location of training data')
  .option('-t, --test-data <file>', 'Optional test data location')
  .option('-e, --epochs [value]', 'The number of times to iterate over all training data [default 10]', parseInt, 10)
  .option('-b, --batch-size [value]', 'The size of batches to split epoch into [default 10]', parseInt, 10)
  .option('-r, --learning-rate [value]', 'The learning rate [default 3.0]', parseFloat, 3.0)
  .parse(process.argv)
  

  
  // network
  // 	- location
  // 	or
  // 	- layer sizes
  // 
  // 
  // training data location
  // number of epochs
  // mini batch size
  // learning rate
  // test data location