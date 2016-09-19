'use strict';
angular.module('main')
.service('AuthService', function ($log, $timeout, $firebaseAuth) {
  var vm = this;
  vm.firebaseAuthObj = $firebaseAuth();

  vm.checkStatus = checkStatusFunc;

  function checkStatusFunc () {
    $log.info(vm.firebaseAuthObj);
  }
});
