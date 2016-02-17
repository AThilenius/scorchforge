module.exports = function(grunt) {

  var date = new Date();
  var timestamp =
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-` +
    `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concat all Bower components
    'bower_concat': {
      'all': {
        'dest': 'client/build/_bower.js',
        'cssDest': 'client/build/_bower.css',
        'mainFiles': {
          'ace-builds': [
            'src-min-noconflict/ace.js',
            'src-min-noconflict/ext-language_tools.js'
          ],
          'angular-ui-ace': 'ui-ace.min.js',
          'bootstrap': ['dist/css/bootstrap.min.css',
            'dist/js/bootstrap.js'
          ],
          'font-awesome': 'css/font-awesome.css'
        },
        'dependencies': {
          'angular-ui-ace': ['angular', 'ace-builds'],
          'underscore': 'jquery',
          'angular': 'jquery'
        }
      }
    },

    // Generate Loopback AngularJS API
    'loopback_sdk_angular': {
      'all': {
        'options': {
          'input': 'server/server.js',
          'output': 'client/build/lb-services.js'
        }
      }
    },

    // Concat Bower and Loopback AngularJS API
    'concat': {
      'app_css': {
        'src': ['client/app/**/*.css'],
        'dest': 'client/build/compiled_app.css',
      },
      'app_css_prod': {
        'src': ['client/build/_bower.css'],
        'dest': 'client_prod/build/01_lib' + timestamp + '.css',
      },
      'lib_css_prod': {
        'src': ['client/app/**/*.css'],
        'dest': 'client_prod/build/02_app' + timestamp + '.css',
      }
    },

    // Compile libraries and source
    'closure-compiler': {
      'libs': {
        'js': ['client/build/_bower.js', 'client/build/lb-services.js'],
        'jsOutputFile': 'client/build/compiled_libs.js',
        'maxBuffer': 5000,
        'options': {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS',
          'debug': null,
          'formatting': 'PRETTY_PRINT'
        }
      },
      'libs_prod': {
        'js': ['client/build/_bower.js', 'client/build/lb-services.js'],
        'jsOutputFile': 'client_prod/build/01_lib-' + timestamp + '.js',
        'maxBuffer': 5000,
        'options': {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS'
        }
      },
      'app_root_prod': {
        'js': ['client/app/*.js', 'client/app/base/**/*.js'],
        'jsOutputFile': 'client_prod/build/02_app-' + timestamp + '.js',
        'maxBuffer': 5000,
        'options': {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS'
        }
      },
      'app_prod': {
        'js': ['client/app/**/*.js', '!client/app/*.js',
          '!client/appl/base/**/*.js'
        ],
        'jsOutputFile': 'client_prod/build/04_app-' + timestamp + '.js',
        'maxBuffer': 5000,
        'options': {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS'
        }
      }
    },

    'includeSource': {
      'options': {
        'templates': {
          'html': {
            'js': '<script src="{filePath}"></script>',
            'css': '<link rel="stylesheet" type="text/css" ' +
              'href="{filePath}" />',
          }
        }
      },
      'dev': {
        'files': {
          'client/index.html': 'client/index.html'
        }
      },
      'prod': {
        'files': {
          'client_prod/index.html': 'client_prod/index.html'
        }
      }
    },

    'ngtemplates': {
      'prod': {
        'cwd': 'client',
        'src': ['app/**/*.htm', 'app/**/*.html'],
        'dest': 'client_prod/build/03_templates-' + timestamp + '.js',
        'options': {
          'module': 'app',
          'htmlmin': {
            'collapseWhitespace': true,
            'collapseBooleanAttributes': true
          }
        }
      }
    },

    'shell': {
      'clear_build_prod': {
        'command': 'rm -rf client_prod/build/*'
      },
      'cp_assets_to_prod': {
        'command': 'rm -rf client_prod/assets && ' +
          'cp -r client/assets client_prod/assets'
      },
      'cp_lib_css': {
        'command': 'cp client/build/_bower.css client_prod/build/01_lib-' +
          timestamp + '.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'includeSource:dev',
    'loopback_sdk_angular',
    'bower_concat',
    'closure-compiler:libs',
    'concat:app_css'
  ]);

  grunt.registerTask('build:prod', [
    'shell:clear_build_prod',
    'loopback_sdk_angular',
    'bower_concat',
    'closure-compiler:libs_prod',
    'closure-compiler:app_root_prod',
    'closure-compiler:app_prod',
    'concat:lib_css_prod',
    'concat:app_css_prod',
    'ngtemplates:prod',
    'includeSource:prod',
    'shell:cp_assets_to_prod'
  ]);

  grunt.registerTask('check', ['closure-compiler:check']);

};
