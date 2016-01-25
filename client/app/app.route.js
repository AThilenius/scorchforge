// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('app').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('login',
        {
          url: '/login',
          templateUrl: 'app/components/login/login.html',
          controller: 'loginController'
        })
        .state('create_user',
            {
              url: '/create_user',
              templateUrl: 'app/components/create_user/create_user.html',
              controller: 'createUserController'
            })
        .state('forge', {
          url: '/forge',
          templateUrl: 'app/components/forge/forge.html',
          controller: 'forgeController'
        });
    $urlRouterProvider.otherwise('forge');

    $locationProvider.html5Mode(true);
  }
]);
