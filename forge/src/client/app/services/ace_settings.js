var app = angular.module('app');

app.service('aceSettings', [
  '$cookies',
  '$log',
  '$rootScope',
  function($cookies, $log, $rootScope) {
    var SETTINGS_COOKIE_KEY = 'scorchEditorSettings';

    var settings = {};

    settings.values = {
      selectionStyle: 'line', //
      highlightActiveLine: true, //
      highlightSelectedWord: true, //
      cursorStyle: 'ace', //
      wrap: false, //
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      highlightGutterLine: true, //
      animatedScroll: true, //
      showInvisibles: false, //
      showPrintMargin: true, //
      foldStyle: 'markbegin', //
      fadeFoldWidgets: true, //
      showFoldWidgets: true, //
      showLineNumbers: true, //
      showGutter: true, //
      displayIndentGuides: true, //
      scrollPastEnd: true, //
      theme: 'ace/theme/monokai', //
      fontSize: 12, //
      keyboardHandler: '' //
    };

    var cookieSettingsJson = $cookies.get(SETTINGS_COOKIE_KEY);
    if (cookieSettingsJson) {
      var cookieSettingsObj = JSON.parse(cookieSettingsJson);
      settings.values = jQuery.extend(settings.values, cookieSettingsObj);
    }

    settings.updateValues = function(s) {
      settings.values = s;
      $rootScope.$broadcast('settings:update', s);
      $cookies.putObject(SETTINGS_COOKIE_KEY, s);
    }


    return settings;
  }
]);
