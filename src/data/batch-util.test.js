const expect = require('chai').expect
const batchUtil = require('./batch-util')

const isInOrder = (array) => {
  let isOrdered = true;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
      const num = i * 2 + j + 1
      if (array[i][j] !== num) {
        isOrdered = false
      }
    }
  }
  return isOrdered
}

describe('Batch Util', () => {
  it('should have an generateEpoch function', () => {
    expect(batchUtil.generateEpoch).to.be.a('function')
  })
  
  it('should separate array into mini batches', () => {
    const data = [1,2,3,4,5,6,7,8,9,10]
    const epoch = batchUtil.generateEpoch(data, 2)
    expect(epoch.length).to.equal(5)
    epoch.forEach((batch) => expect(batch.length).to.equal(2))
  })
  
  it('should randomize the order of data', () => {
    const data = [1,2,3,4,5,6,7,8,9,10]
    const epoch = batchUtil.generateEpoch(data, 2)
    expect(epoch).to.not.equal([[1,2],[3,4],[5,6],[7,8],[9,10]])
    expect(isInOrder(epoch)).to.equal(false)
  })
})
