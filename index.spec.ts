const assert = require('assert');
const helloNpmFunc = require('./index');

describe('Test', function () {
  describe('String', function () {
    it('should return true', function () {
      assert.equal(helloNpmFunc(), 'hello NPM');
    });
  });
});
