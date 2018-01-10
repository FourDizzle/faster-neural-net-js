const expect = require('chai').expect;
const numberLoader = require('./mnist-loader');

describe('Number Data Loader', () => {
  it('should have an loadData function', () => {
    expect(numberLoader.loadData).to.be.a('function');
  });
});
