'use strict';

angular.module('blockchain.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'homepage/homepage.html',
    controller: 'HomepageCtrl',
    controllerAs: 'homepageController'
  });
}])

.controller('HomepageCtrl', ['$scope', '$http', function($scope, $http) {
  var homepageController = this;
  homepageController.blocks = [];
  $http({
    method: 'GET',
    url: 'https://btc.blockr.io/api/v1/coin/info'
  }).then(function successCallback(response) {
    var data = response.data.data;
    $scope.value = data.markets.coinbase.value;
    $scope.all = data.volume.all;
    $scope.current = data.volume.current;
    $scope.perc = data.volume.perc;
    $scope.market_cap = data.markets.coinbase.value * data.volume.current;
    $scope.difficulty = data.last_block.difficulty;
    $scope.next_difficulty = data.next_difficulty.difficulty;
    $scope.next_difficulty_perc = data.next_difficulty.perc;
    $scope.retarget_in = data.next_difficulty.retarget_in;
    
    var blockHeights = [];
    var lastBlockHeight = data.last_block.nb;
    var lowerblockHeight = lastBlockHeight - 19;
    for(var i = lastBlockHeight; i >= lowerblockHeight; i--){
      blockHeights.push(i);
    }
    
    $http({
      method: 'GET',
      url: 'https://btc.blockr.io/api/v1/block/info/' + blockHeights.join(',')
    }).then(function successCallback(response) {
      var data = response.data.data;
      angular.forEach(data, function(block) {
        homepageController.blocks.push({
          nb: block.nb,
          time_utc: block.time_utc,
          nb_txs: block.nb_txs,
          fee: block.fee,
          size: block.size,
          days_destroyed: block.days_destroyed
        });
      });
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

}]);
