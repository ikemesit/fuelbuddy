'use strict';
angular.module('main')
.factory('LoadingService', function ($log, $timeout, $ionicLoading) {
  return {
    showLoadingState: showLoadingState,
    hideLoadingState: hideLoadingState
  };

  function showLoadingState () {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
      // duration: 1000
    }).then(function () {
      $log.log('The loading indicator is now displayed');
    });
  }

  function hideLoadingState () {
    $ionicLoading.hide().then(function () {
      $log.log('The loading indicator is now hidden');
    });
  }
});
