'use strict';

angular.module('blockchain.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'homepage/homepage.html',
    controller: 'HomepageCtrl'
  });
}])

.controller('HomepageCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://btc.blockr.io/api/v1/coin/info'
  }).then(function successCallback(response) {
    var data = response.data.data;
    console.log(data);
    $scope.value = data.markets.coinbase.value;
    $scope.all = data.volume.all;
    $scope.current = data.volume.current;
    $scope.perc = data.volume.perc;
    $scope.market_cap = data.markets.coinbase.value * data.volume.current;
    $scope.difficulty = data.last_block.difficulty;
    $scope.next_difficulty = data.next_difficulty.difficulty;
    $scope.next_difficulty_perc = data.next_difficulty.perc;
    $scope.retarget_in = data.next_difficulty.retarget_in;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

}]);
