'use strict';
angular.module('main', [
  'ionic',
  'ionic.cloud',
  'ngCordova',
  'ui.router',
  'firebase',
  'toastr'
  // TODO: load other modules selected during generation
])

.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider, toastrConfig) {
// Initialize ionic cloud services
  $ionicCloudProvider.init({
    'core': {
      'app_id': '9ab11262'
    }
  });

  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 1000;
  toastrConfig.positionClass = 'toast-top-full-width';
  toastrConfig.preventDuplicates = false;
  toastrConfig.progressBar = true;


  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/dashboard');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('login', {
      url: '/login',
      templateUrl: 'main/templates/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu',
      resolve: {
        'currentAuth': ['AuthService', function (AuthService) {
          return AuthService.firebaseAuthObj.$requireSignIn();
        }]
      }
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
          controller: 'DieselOrderController as dieselctrl'
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
    .state('main.settings', {
      url: '/settings',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/settings.html',
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
