'use strict';

var path = require('path');

module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*'],
        serverJS   : ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS   : ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS  : ['public/modules/**/*.css'],
        mochaTests : ['app/tests/**/*.js']
    };

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks matching the `grunt-*` pattern
    // https://github.com/sindresorhus/load-grunt-tasks
    //require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app : 'public',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    // Project Configuration
    grunt.initConfig({
        yeoman          : yeomanConfig,
        clean           : {
            dist  : {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        useminPrepare   : {
            html   : '<%= yeoman.app %>/views/*.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin          : {
            html   : ['<%= yeoman.dist %>/{,*/}*.html'],
            css    : ['<%= yeoman.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        cdnify          : {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin           : {
            dist: {
                files: [{
                    expand: true,
                    cwd   : '<%= yeoman.dist %>/js',
                    src   : '*.js',
                    dest  : '<%= yeoman.dist %>/js'
                }]
            }
        },
        cssmin          : {
            build: {
                files: {
                    '<%= yeoman.dist %>/application.css': ['<%= yeoman.dist %>/css/*.css']
                }
            }
        },
        htmlmin         : {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files  : [{
                    expand: true,
                    cwd   : '<%= yeoman.app %>',
                    src   : ['*.html', 'views/*.html'],
                    dest  : '<%= yeoman.dist %>'
                }]
            }
        },
        imagemin        : {
            dist: {
                files: [{
                    expand: true,
                    cwd   : '<%= yeoman.app %>/img',
                    src   : '{,*/}*.{png,jpg,jpeg}',
                    dest  : '<%= yeoman.dist %>/img'
                }]
            }
        },
        uglify          : {
            build: {
                options: {
                    mangle: false
                },
                files  : {
                    '<%= yeoman.dist %>/application.js': [
                        '<%= yeoman.dist %>/js/*.js'
                    ]
                }
            }
        },
        copy            : {
            dist: {
                files: [{
                    expand: true,
                    dot   : true,
                    cwd   : '<%= yeoman.app %>',
                    dest  : '<%= yeoman.dist %>',
                    src   : [
                        '**'
                        //              '*.{ico,png,txt}',
                        //              '.htaccess',
                        //              'bower_components/**/*',
                        //              'img/{,*/}*.{gif,webp,svg}',
                        //              'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd   : '.tmp/img',
                    dest  : '<%= yeoman.dist %>/img',
                    src   : [
                        'generated/*'
                    ]
                }]
            }
        },
        rev             : {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/{,*/}*.js',
                        '<%= yeoman.dist %>/css/{,*/}*.css',
                        '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/css/fonts/*'
                    ]
                }
            }
        },
        // start original project tasks
        pkg             : grunt.file.readJSON('package.json'),
        watch           : {
            serverViews: {
                files  : watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS   : {
                files  : watchFiles.serverJS,
                tasks  : ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files  : watchFiles.clientViews,
                options: {
                    livereload: true
                }
            },
            clientJS   : {
                files  : watchFiles.clientJS,
                tasks  : ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS  : {
                files  : watchFiles.clientCSS,
                options: {
                    livereload: true
                }
            }
        },
        jshint          : {
            all: {
                src    : watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        csslint         : {
            options: {
                csslintrc: '.csslintrc'
            },
            all    : {
                src: watchFiles.clientCSS
            }
        },
        nodemon         : {
            dev: {
                script : 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    cwd     : __dirname,
                    ext     : 'js,html',
                    ignore  : ['**/node_modules/*', '**/.git/*'],
                    watch   : watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port'         : 1337,
                    'web-host'         : 'localhost',
                    'debug-port'       : 5858,
                    'save-live-edit'   : true,
                    'no-preload'       : true,
                    'stack-trace-limit': 50,
                    'hidden'           : []
                }
            }
        },
        concurrent      : {
            default: ['nodemon', 'watch'],
            debug  : ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true,
                limit              : 10
            }
        },
        env             : {
            test: {
                NODE_ENV: 'test'
            }
        },
        mochaTest       : {
            src    : watchFiles.mochaTests,
            options: {
                reporter: 'spec',
                require : 'server.js'
            }
        },
        karma           : {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    //Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'copy',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);
};