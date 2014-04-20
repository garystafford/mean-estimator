'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks matching the `grunt-*` pattern
  // https://github.com/sindresorhus/load-grunt-tasks
  //require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {
  }

  // Project Configuration
  grunt.initConfig({
    yeoman: yeomanConfig,
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>/scripts',
            src: '*.js',
            dest: '<%= yeoman.dist %>/scripts'
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'bower_components/**/*',
              'images/{,*/}*.{gif,webp,svg}',
              'styles/fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: [
              'generated/*'
            ]
          }
        ]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
     dist: {}
     },*/
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    // start original project tasks
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serverViews: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      serverJS: {
        files: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientViews: {
        files: ['public/modules/**/views/*.html'],
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: ['public/js/**/*.js', 'public/modules/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientCSS: {
        files: ['public/**/css/*.css'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/**/*.js', 'public/modules/**/*.js'],
        options: {
          jshintrc: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug']
        }
      }
    },
    concurrent: {
              server: [
        'coffee:dist'
      ],
      test: [
        'coffee'
      ],
      dist: [
        'coffee',
        'imagemin',
        'htmlmin'
      ],
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    mochaTest: {
      src: ['app/tests/**/*.js'],
      options: {
        reporter: 'spec',
        require: 'server.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  //Load NPM tasks 
//  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-mocha-test');
//  grunt.loadNpmTasks('grunt-karma');
//  grunt.loadNpmTasks('grunt-nodemon');
//  grunt.loadNpmTasks('grunt-concurrent');
//  grunt.loadNpmTasks('grunt-env');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['jshint', 'concurrent']);

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);
};