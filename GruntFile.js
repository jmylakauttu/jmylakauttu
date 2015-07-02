'use strict';


module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      options: {
        spawn: false
      },
      sass: {
        files: [
          'script/**/*.js',
          'scss/**/*.{scss,sass}'],
        tasks: ['sass:style']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'script/**/*.js',
            'css/**/*.css'
          ]
        }
      },
      options: {
        watchTask: true,
        port: 3000,
        server: {
          baseDir: '.'
        }
      }
    },
    sass: {
      options: {
        sourceMap: false
      },
      style: {
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    }
  });


  grunt.registerTask('default', [
    'sass:style'
  ]);

  grunt.registerTask('serve', [
    'sass:style',
    'browserSync',
    'watch:sass'
  ]);
};
