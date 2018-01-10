const expect = require('chai').expect
const nn = require('./network')

describe('Neural Net', () => {
  describe('Generate Network', () => {
    it('should have a generateNetwork function', () => {
      expect(nn.generateNetwork).to.be.a('function')
    })
    
    it('should generate a network with correct number of layers', () => {
      const network = nn.generateNetwork([1, 1, 1, 1])
      expect(network.numberOfLayers).to.equal(4)
      expect(network.biases.length).to.equal(3)
      expect(network.weights.length).to.equal(3)
    })
    
    it('should have appropriate number of weights per layer', () => {
      const network = nn.generateNetwork([5, 4, 3])
      expect(network.weights[0].length).to.equal(4)
      network.weights[0].forEach(weight => expect(weight.length).to.equal(5))
      expect(network.weights[1].length).to.equal(3)
      network.weights[1].forEach(weight => expect(weight.length).to.equal(4))
    })
    
    it('should have appropriate number of biases per layer', () => {
      const network = nn.generateNetwork([5, 4, 3])
      expect(network.biases[0].length).to.equal(4)
      expect(network.biases[1].length).to.equal(3)
    })
  })
  
  describe('Feed Forward', () => {
    it('should have a feedForward function', () => {
      expect(nn.feedForward).to.be.a('function')
    })
  })
  
  describe('Stochastic Gradient Descent', () => {
    it('should have a stochGradDesc function', () => {
      expect(nn.stochGradDesc).to.be.a('function')
    })
  })
  
  describe('Update To Minibatch', () => {
    it('should have an updateToMiniBatch function', () => {
      expect(nn.updateToMiniBatch).to.be.a('function')
    })
  })
})