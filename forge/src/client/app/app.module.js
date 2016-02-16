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
  'thilenius.tty',
  'thilenius.sidebar',
  'thilenius.content_window',
  'formly',
  'formlyBootstrap'
]);

app.run([
  'editableOptions',
  function(editableOptions) {
    editableOptions.theme = 'bs3';
  }
]);

app.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'LoopBackAuth',
      function($q, $location, LoopBackAuth) {
        return {
          responseError: function(rejection) {
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

app.run(['formlyConfig', 'formlyValidationMessages',
  function(formlyConfig, formlyValidationMessages) {
    formlyValidationMessages.addStringMessage('required',
      'This field is required');
    formlyValidationMessages.addStringMessage('email', 'Email is invalid');
    formlyValidationMessages.addStringMessage('minlength', 'Too short');

    formlyConfig.setType({
      name: 'customInput',
      extends: 'input',
      apiCheck: function(check) {
        return {
          templateOptions: {
            foo: check.string.optional
          }
        };
      }
    });

    formlyConfig.setType({
      name: 'matchField',
      apiCheck: function() {
        return {
          data: {
            fieldToMatch: formlyExampleApiCheck.string
          }
        };
      },
      apiCheckOptions: {
        prefix: 'matchField type'
      },
      defaultOptions: function matchFieldDefaultOptions(options) {
        return {
          extras: {
            validateOnModelChange: true
          },
          expressionProperties: {
            'templateOptions.disabled': function(viewValue,
              modelValue,
              scope) {
              var matchField = find(scope.fields, 'key', options.data
                .fieldToMatch);
              if (!matchField) {
                throw new Error(
                  'Could not find a field for the key ' +
                  options.data.fieldToMatch);
              }
              var model = options.data.modelToMatch || scope.model;
              var originalValue = model[options.data.fieldToMatch];
              var invalidOriginal = matchField.formControl &&
                matchField.formControl.$invalid;
              return !originalValue || invalidOriginal;
            }
          },
          validators: {
            fieldMatch: {
              expression: function(viewValue, modelValue, fieldScope) {
                var value = modelValue || viewValue;
                var model = options.data.modelToMatch || fieldScope
                  .model;
                return value === model[options.data.fieldToMatch];
              },
              message: options.data.matchFieldMessage ||
                '"Must match"'
            }
          }
        };

        function find(array, prop, value) {
          var foundItem;
          array.some(function(item) {
            if (item[prop] === value) {
              foundItem = item;
            }
            return !!foundItem;
          });
          return foundItem;
        }
      }
    });

    formlyConfig.setWrapper({
      name: 'customValidation',
      templateUrl: 'my-messages.html'
    });
  }
]);
