'use strict';

describe('blockchain.version module', function() {
  beforeEach(module('blockchain.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
