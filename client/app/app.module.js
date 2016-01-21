// Copyright 2015 Alec Thilenius
// All rights reserved.
var app = angular.module('app', [
    'lbServices',
    'ngAnimate',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'dndLists',
    'ui.ace',
    'ui.router',
    'ui.bootstrap.contextMenu',
    'ui.bootstrap',
    'xeditable',
    'thilenius.navbar',
    'thilenius.sidebar',
    'thilenius.content_window',
    'formly',
    'formlyBootstrap'
]);

app.run([
    'editableOptions',
    function (editableOptions) {
        editableOptions.theme = 'bs3';
    }
]);

app.config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$q',
            '$location',
            'LoopBackAuth',
            function ($q, $location, LoopBackAuth) {
                return {
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            // Now clearing the loopback values from client browser for safe
                            // logout...
                            LoopBackAuth.clearUser();
                            LoopBackAuth.clearStorage();
                            $location.nextAfterLogin = $location.path();
                            $location.path('/login');
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
]);

app.run(function (formlyConfig, formlyValidationMessages, formlyApiCheck) {
    formlyConfig.setWrapper({
        name: 'validation',
        types: ['input', 'customInput'],
        templateUrl: 'my-messages.html'
    });

    formlyValidationMessages.addStringMessage('required', 'This field is required');
    formlyValidationMessages.addStringMessage('email', 'Email is invalid');
    formlyValidationMessages.addStringMessage('minlength', 'Too short');

    formlyConfig.setType({
        name: 'customInput',
        extends: 'input',
        apiCheck: function (check) {
            return {
                templateOptions: {
                    foo: check.string.optional
                }
            };
        }
    });
});