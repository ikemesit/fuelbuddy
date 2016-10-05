'use strict';
angular.module('main')
.controller('DieselOrderController', function ($log, $state, $scope, $ionicModal, $timeout, LoadingService, FirebaseApiService) {
  var vm = this;
  vm.order = {
    amount: 0,
    contact: null,
    address: null,
    landmark: null,
    paymentOption: null,
    time: {'.sv': 'timestamp'}
  };

  // public methods
  vm.getOrderDetails = getOrderDetails;
  vm.placeOrder = placeOrder;
  vm.cancelOrder = cancelOrder;

  // Initialize $ionicModal Service
  $ionicModal.fromTemplateUrl('confirm-order.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Clean up on scope exit
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  // Method Functions
  function placeOrder () {
    LoadingService.showLoadingState();
    FirebaseApiService
      .addNewOrder(vm.order)
      .then(function () {
        LoadingService.hideLoadingState();
        $state.go('main.dashboard');
        $scope.modal.hide();
      });
  }

  function getOrderDetails () {
    if (vm.order.amount === 0 ||
        vm.order.contact === null ||
        vm.order.address === null ||
        vm.order.landmark === null ||
        vm.order.paymentOption === null
      ) {
      $log.info('Entry cannot be Empty!');
    } else {
      $scope.modal.show();
    }
  }

  function cancelOrder () {
    vm.order = {
      amount: 0,
      contact: null,
      address: null,
      landmark: null,
      paymentOption: null,
      time: {'.sv': 'timestamp'}
    };
    $scope.modal.hide();
  }

});
