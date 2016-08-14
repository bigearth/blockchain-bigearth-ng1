'use strict';

angular.module('blockchain.transactions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/transactions/:transaction', {
    templateUrl: 'transactions/transactions.html',
    controller: 'TransactionsCtrl'
  });
}])

.controller('TransactionsCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  var transactionsController = this;
  transactionsController.vins = [];
  transactionsController.vouts = [];
  $http({
    method: 'GET',
    url: 'https://btc.blockr.io/api/v1/tx/info/' + $routeParams.transaction
  }).then(function successCallback(response) {
    var data = response.data.data;
    $scope.block = data.block;
    $scope.days_destroyed = data.days_destroyed;
    $scope.fee = data.fee;
    $scope.amount = data.amount;
    
    angular.forEach(data.vins, function(vin) {
      transactionsController.vins.push({
        address: vin.address,
        amount: vin.amount
      });
    });
    
    angular.forEach(data.vouts, function(vout) {
      transactionsController.vouts.push({
        address: vout.address,
        amount: vout.amount
      });
    });
    // $scope.balance = data.balance;
    // $scope.totalreceived = data.totalreceived;
    // $scope.nb_txs = data.nb_txs;
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  // 
  // $http({
  //   method: 'GET',
  //   url: 'https://btc.blockr.io/api/v1/address/txs/' + $routeParams.address
  // }).then(function successCallback(response) {
  //   var data = response.data.data;
  //   angular.forEach(data.txs, function(tx) {
  //     addressesController.txs.push({
  //       tx: tx.tx,
  //       time_utc: tx.time_utc,
  //       amount: tx.amount,
  //       confirmations: tx.confirmations
  //     });
  //   });
  // }, function errorCallback(response) {
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });
}]);
