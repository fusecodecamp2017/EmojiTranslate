module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-compress');

  require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    clean: {
      prodDist: ['dist/*'],
      testDist: ['test/dist/*']
    },
    mkdir: {
      prodDist: {
        options: {
          create: ['dist']
        }
      },
      testDist: {
        options: {
          create: ['test/dist']
        }
      }
    },
    "babel": {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'app/js',
            src: ['**/*.js'],
            dest: 'dist/js',
            flatten: true
          }
        ]
      },
      test: {
        files: {
          'test/dist/emoji-test.js': 'test/emoji-test.js'
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            src: 'app/manifest.json',
            dest: 'dist/manifest.json'
          },
          {
            cwd: 'app',
            expand: true,
            src: ['html/**'],
            dest: 'dist/'
          },
          {
            cwd: 'app',
            expand: true,
            src: ['css/**'],
            dest: 'dist/'
          }
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'dist/emoji-translate.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['manifest.json', 'html/**', 'css/**', 'js/**']
          }
        ]
      }
    },
    qunit: {
      all: ['test/**/*.html']
    }
  });

  grunt.registerTask("default", ["clean:prodDist", "mkdir:prodDist", "babel:prod", "copy", "compress"]);
  grunt.registerTask("test", ["babel:prod", "clean:testDist", "mkdir:testDist", "babel:test", "qunit"]);
};