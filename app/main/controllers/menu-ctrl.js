'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $state, currentAuth, AuthService) {
  var vm = this;
  vm.signOut = signOutFunc;
  $log.log(currentAuth);

  function signOutFunc () {
    AuthService.firebaseAuthObj.$signOut();
    $state.go('login');
  }

});
