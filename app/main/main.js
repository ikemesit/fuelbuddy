'use strict';
angular.module('main', [
  'ionic',
  'ionic.cloud',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
  // Initialize ionic cloud services
  $ionicCloudProvider.init({
    'core': {
      'app_id': '9ab11262'
    }
  });

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/dashboard');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
    .state('main.dashboard', {
      url: '/dashboard',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/dashboard.html',
          // controller: '<someCtrl> as ctrl'
        }
      }
    })
    .state('main.diesel', {
      url: '/diesel',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/buy-diesel.html',
          // controller: '<someCtrl> as ctrl'
        }
      }
    })
    .state('main.gas', {
      url: '/gas',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/buy-gas.html',
          // controller: '<someCtrl> as ctrl'
        }
      }
    })
    .state('main.debug', {
      url: '/debug',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/debug.html',
          controller: 'DebugCtrl as ctrl'
        }
      }
    });
});
