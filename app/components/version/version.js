'use strict';

angular.module('blockchain.version', [
  'blockchain.version.interpolate-filter',
  'blockchain.version.version-directive'
])

.value('version', '0.1');
