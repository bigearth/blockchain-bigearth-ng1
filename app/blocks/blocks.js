'use strict';

angular.module('blockchain.blocks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blocks/:block', {
    templateUrl: 'blocks/blocks.html',
    controller: 'BlocksCtrl'
  });
}])

.controller('BlocksCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  var blocksController = this;
  blocksController.txs = [];
  blocksController.vins = [];
  $http({
    method: 'GET',
    url: 'http://btc.blockr.io/api/v1/block/info/' + $routeParams.block
  }).then(function successCallback(response) {
    var data = response.data.data;
    $scope.nb = data.nb;
    $scope.time_utc = data.time_utc;
    $scope.vout_sum = data.vout_sum;
    $scope.nb_txs = data.nb_txs;
    $scope.difficulty = data.difficulty;
    $scope.fee = data.fee;
    $scope.hash = data.hash;
    $scope.version = data.version;
    $scope.confirmations = data.confirmations;
    $scope.merkleroot = data.merkleroot;
    $scope.next_block_hash = data.next_block_hash;
    $scope.prev_block_hash = data.prev_block_hash;
    $scope.size = data.size;
    $scope.days_destroyed = data.days_destroyed;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http({
    method: 'GET',
    url: 'http://btc.blockr.io/api/v1/block/txs/' + $routeParams.block
  }).then(function successCallback(response) {
    var data = response.data.data;
    console.log(data);
    angular.forEach(data.txs, function(tx) {
      blocksController.txs.push({
        tx: tx.tx,
        fee: tx.fee,
        days_destroyed: tx.days_destroyed
      });
      angular.forEach(tx.trade.vins, function(vin) {
        console.log(vin);
        blocksController.vins.push({
          address: vin.address,
          amount: vin.amount
        });
      });
    });
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}]);