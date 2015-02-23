module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        curl: {
            'google-fonts-source': {
                src: 'http://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic',
                dest: 'public/css/google-fonts-lato.css'
            }
        },

        less: {
            development: {
                options: {
                    paths: ["public/css"]
                },
                files: {
                    "public/css/style.css": "public/css/less/style.less"
                }
            }
        },

        watch: {
            less: {
                files: 'public/css/less/*.less',
                tasks: 'less'
            }
        },

        jshint: {
            files: [
                '*.js'
            ],
            options: {
                expr: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    report: 'gzip'
                },
                files: {
                    'public/js/showmeuglify.min.js' : [
                        '*.js'
                    ]
                }
            },
            dev: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    beautify: true,
                    compress: false,
                    mangle: false
                },
                files: {
                    'public/js/showmeuglify.js' : [
                        '*.js'
                    ]
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    // {expand: true, src: ['public/*'], dest: '~/Sites/research/research-node/', filter: 'isFile'},

                    // includes files within path and its sub-directories
                    {expand: true, src: ['public/**'], dest: '/Users/roybailey/Sites/research/research-node/'},

                    // makes all src relative to cwd
                    // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                    // flattens results to a single level
                    // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
                ]
            }
        }
    });

};

