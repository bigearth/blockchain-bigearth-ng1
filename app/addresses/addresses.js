'use strict';

angular.module('blockchain.addresses', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addresses/:address', {
    templateUrl: 'addresses/addresses.html',
    controller: 'AddressesCtrl',
    controllerAs: 'addressesController'
  });
}])

.controller('AddressesCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  var addressesController = this;
  addressesController.txs = [];
  $http({
    method: 'GET',
    url: 'https://btc.blockr.io/api/v1/address/info/' + $routeParams.address
  }).then(function successCallback(response) {
    var data = response.data.data;
    $scope.address = data.address;
    $scope.balance = data.balance;
    $scope.totalreceived = data.totalreceived;
    $scope.nb_txs = data.nb_txs;
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http({
    method: 'GET',
    url: 'https://btc.blockr.io/api/v1/address/txs/' + $routeParams.address
  }).then(function successCallback(response) {
    var data = response.data.data;
    angular.forEach(data.txs, function(tx) {
      addressesController.txs.push({
        tx: tx.tx,
        time_utc: tx.time_utc,
        amount: tx.amount,
        confirmations: tx.confirmations
      });
    });
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}]);
