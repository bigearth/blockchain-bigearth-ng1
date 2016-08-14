'use strict';

// Declare app level module which depends on views, and components
angular.module('blockchain', [
  'ngRoute',
  'blockchain.homepage',
  'blockchain.blocks',
  'blockchain.addresses',
  'blockchain.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);
