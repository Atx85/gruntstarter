module.exports = function( grunt ) {
    grunt.initConfig({
        babel: {
            options: {
                plugins: ['transform-react-jsx'], 
                presets: ['@babel/preset-env','@babel/preset-react']
            },
            // dist: {
            //     files: {
            //         'app.js':'src/react/app.jsx'
            //     }
            // }
            dist: {
                files: [{
                expand: true,
                cwd: 'src/react/',
                src: ['**/*.jsx'],
                dest: 'build/react/',
                ext: '.js'
                }]
            }
        },
        browserify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/react',
                    src: ['*.js'],
                    dest: 'build/browserified',
                    ext: '.js'
                }]
            }
        },
        concat: {
            js: {
                files: {
                    'app.js' : 'build/browserified/**/*.js'
                }
            }
        },
        uglify: {
            'app.min.js':'app.js'
        },
        sass: {
            dist: {
                files: {
                    'build/sass/style.css':'src/sass/main.scss'
                }
            },
            options: {
                style: 'expanded',
                sourcemap: 'none',
                lineNumbers: true
              }      
        },
        autoprefixer: {
            options: {
                browsers: [ '> 0.001%']
              },
              build: {
                src: 'build/sass/style.css',
                dest: 'build/autoprefixed/style.css'
              }            
        },
        cssmin: {
            'style.min.css': 'build/autoprefixed/style.css'
        },
        watch: {
            jsx : {
                files: 'src/react/**/*.jsx',
                tasks: ['babel','browserify','concat','uglify']
            },
            scss: {
                files: 'src/sass/**/*.scss',
                tasks: ['sass','autoprefixer','cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['watch']);
}