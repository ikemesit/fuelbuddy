'use strict';
angular.module('main')
.controller('LoginCtrl', function ($scope, $log, $timeout, $state, $ionicModal, AuthService, LoadingService) {
  var vm = this;

  //login models
  vm.user = {
    email: null,
    password: null
  };
  vm.userSignUpCredentials = {
    name: null,
    email: null,
    password: null,
    verifyPassword: null,
    phone: null
  };

  //login methods
  vm.signIn = signInFunc;
  vm.signUp = signUpFunc;
  vm.cancel = cancel;
  vm.showSignUpForm = showSignUpFormFunc;
  vm.validateEmail = validateEmail;
  vm.clearErrorState = clearErrorState;
  vm.verifyPassword = verifyPassword;

  //State models
  vm.emailValidationOk = false;
  vm.errorMessage = null;
  vm.passwordVerified = false;

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

  function validateEmail (email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email) === false) {
      vm.emailValidationOk = false;
    } else {
      vm.emailValidationOk = true;
    }
  }

  function showSignUpFormFunc () {
    vm.emailValidationOk = false;
    $scope.modal.show();
  }

  function signUpFunc () {
    LoadingService.showLoadingState();
    if (vm.userSignUpCredentials.name !== null &&
        vm.userSignUpCredentials.email !== null &&
        vm.userSignUpCredentials.password !== null &&
        vm.userSignUpCredentials.phone !== null) {
      if (vm.emailValidationOk !== false && vm.passwordVerified !== false ) {
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

  // Signs in user using Firebase's auth API,
  // redirects user to dashboard (using state resolves => main.js)
  // and catches error codes, if ANY.
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
          switch (error.code) {
            case 'auth/user-not-found':
              vm.errorMessage = 'User does not exist';
              break;
            case 'auth/wrong-password':
              vm.errorMessage = 'Wrong Password';
              break;
          }
          LoadingService.hideLoadingState();
        });
    }
  }

  // Signup Cancel
  function cancel () {
    $scope.modal.hide();
    clearErrorState();
    vm.emailValidationOk = false;
  }

  // Resets Error Message
  function clearErrorState () {
    vm.errorMessage = null;
  }

  // Verifies Password
  function verifyPassword () {
    // $log.info('verification active!');
    if (vm.userSignUpCredentials.password === vm.userSignUpCredentials.verifyPassword) {
      vm.passwordVerified = true;
    } else {
      vm.passwordVerified = false;
    }
  }
});
