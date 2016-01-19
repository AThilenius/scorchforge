module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concat all Bower components
    bower_concat: {
      all: {
        dest: 'client/build/_bower.js',
        cssDest: 'client/build/_bower.css',
        dependencies: {'underscore': 'jquery', 'angular': 'jquery'}
      }
    },

    // Generate Loopback AngularJS API
    loopback_sdk_angular: {
      all: {
        options: {
          input: 'server/server.js',
          output: 'client/build/lb-services.js'
        }
      }
    },

    // Concat Bower and Loopback AngularJS API
    concat: {
      app_css: {
        src: ['client/app/**/*.css'],
        dest: 'client/build/compiled_app.css',
      }
    },

    // Compile libraries and source
    'closure-compiler': {
      libs: {
        js: ['client/build/_bower.js', 'client/build/lb-services.js'],
        jsOutputFile: 'client/build/compiled_libs.js',
        maxBuffer: 5000,
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS'
          // debug: null,
          // formatting: 'PRETTY_PRINT'
        }
      },
      app: {
        js: 'client/app/**/*.js',
        jsOutputFile: 'client/build/compiled_app.js',
        maxBuffer: 5000,
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS'
          // debug: null,
          // formatting: 'PRETTY_PRINT'
        }
      },
      check: {
        js: 'client/app/**/*.js',
        jsOutputFile: './test_output.js',
        maxBuffer: 5000,
        options: {
          externs: [
            '/root/thilenius/closure/externs/angular.js',
            '/root/thilenius/closure/externs/jquery.js',
            '/root/thilenius/closure/externs/underscore.js'
          ],
          'checks-only': null,
          new_type_inf: null,
          warning_level: 'VERBOSE',
          summary_detail_level: 3
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');

  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'loopback_sdk_angular',
    'bower_concat',
    'closure-compiler:libs',
    'closure-compiler:app',
    'concat:app_css'
  ]);

  grunt.registerTask('check', ['closure-compiler:check']);

};
