'use strict';
angular.module('main')
.constant('Config', function ($http) {
  $http.get('env-dev.json').then(function (response) {
    this.env = response.data;
  });

  return {
    'ENV': this.env,
    'BUILD': ''
  };
});
