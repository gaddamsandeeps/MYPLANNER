module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jsDir: 'public/js/',
        jsDistDir: 'dist/js/',
        cssDir: 'public/css/',
        cssDistDir: 'dist/css/',
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            js: {
                options: {
                    specs: 'spec/*_spec.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['<%=jsDir%>*.js'],
                dest: '<%=jsDistDir%><%= pkg.name.toLowerCase() %>.js'
            },
            css: {
                src: ['<%=cssDir%>*.css'],
                dest: '<%=cssDistDir%><%= pkg.name.toLowerCase() %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name.toLowerCase() %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%=jsDistDir%><%= pkg.name.toLowerCase() %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name.toLowerCase() %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%=cssDistDir%><%= pkg.name.toLowerCase() %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        },
        jshint: {
            all: ['gruntfile.js', 'config/**/*.js', 'app/**/*.js'],
            options: {
                "loopfunc": true,
                "shadow": true
            }
        },
        watch: {
            files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
            tasks: ['concat', 'uglify', 'cssmin']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'watch']);
    grunt.registerTask('test', ['jshint', 'jasmine']);

};
