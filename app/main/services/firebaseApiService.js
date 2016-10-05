'use strict';
angular.module('main')
.service('FirebaseApiService', function ($log, $timeout, $firebaseArray) {


  this.addNewOrder = function (orderObj) {
    // var url = 'https://fuelapp-1bf31.firebaseio.com/orders';
    var ref = firebase.database().ref('orders');
    var dataStore = $firebaseArray(ref);
    return dataStore.$add(orderObj);
  };


});
