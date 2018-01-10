"use strict";

const _ = require('lodash')

module.exports = {
  generateEpoch: (data, batchSize) => _.chunk(_.shuffle(data), 2),
}