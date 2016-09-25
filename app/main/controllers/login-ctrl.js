'use strict';
angular.module('main')
.controller('LoginCtrl', function ($scope, $log, $timeout, $state, $ionicModal, AuthService, LoadingService, toastr) {
  var vm = this;

  //login models
  vm.user = {
    email: null,
    password: null
  };
  vm.userSignUpCredentials = {
    name: null,
    email: null,
    password: null
  };

  //login methods
  vm.signIn = signInFunc;
  vm.signUp = signUpFunc;
  vm.cancel = cancel;
  vm.showSignUpForm = showSignUpFormFunc;
  vm.validateEmail = validateEmail;
  vm.echo = echo;

  //Login switches
  vm.validationComplete = false;

  // Initialize $ionicModal Service
  $ionicModal.fromTemplateUrl('main/templates/signUp.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Clean up on scope exit
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  function echo(val){
    $log.info(val);
  }

  function validateEmail (email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email) === false) {
      vm.validationComplete = false;
      vm.errorMessage = 'Your Email Appears to be incomplete!';
      return false;
    } else {
      vm.validationComplete = true;
      $log.log('Email is ok!');
      return true;
    }
  }

  function showSignUpFormFunc () {
    $scope.modal.show();
  }

  function signUpFunc () {
    LoadingService.showLoadingState();
    if (vm.userSignUpCredentials.name !== null &&
        vm.userSignUpCredentials.email !== null &&
        vm.userSignUpCredentials.password !== null) {
      if (vm.validationComplete !== false ) {
        AuthService
          .firebaseAuthObj
          .$createUserWithEmailAndPassword(vm.userSignUpCredentials.email, vm.userSignUpCredentials.password)
          .then(function (user) {
            $log.log('User ' + user.uid + ' created successfully!');
            $scope.modal.hide();
            $state.go('main.dashboard');
            LoadingService.hideLoadingState();
          })
          .catch(function (error) {
            $log.log('Error: ' + error);
            LoadingService.hideLoadingState();
          });
      }
    }
  }

  function signInFunc () {
    if (vm.user.email !== null && vm.user.password !== null) {
      LoadingService.showLoadingState();
      AuthService
        .firebaseAuthObj
        .$signInWithEmailAndPassword(vm.user.email, vm.user.password)
        .then(function (user) {
          $log.log('Logged In as ' + user );
          $state.go('main.dashboard');
          LoadingService.hideLoadingState();
        })
        .catch(function (error) {
          // $log.log('Error :' + error);
          toastr.error(error.message);
          LoadingService.hideLoadingState();
        });
    }
  }

  function cancel () {
    $scope.modal.hide();
  }
});
