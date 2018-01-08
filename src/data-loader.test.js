const expect = require('chai').expect;
const numberLoader = require('./number-data-loader');

describe('Number Data Loader', () => {
  it('should have an loadTraining function', () => {
    expect(numberLoader.loadTraining).to.be.a('function');
  });
});
