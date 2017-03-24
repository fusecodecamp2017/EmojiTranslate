module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');

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
          'test/dist/emoji-test.js': 'test/emoji-test.js',
          'test/dist/ascii-utils-test.js': 'test/ascii-utils-test.js'
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
    concat: {
      options: {
        separator: '\n',
      },
      content: {
        src: ['dist/js/twemoji-2.2.3.min.js', 'dist/js/emojify.js', 'dist/js/content.js'],
        dest: 'dist/js/content.js'
      },
      background: {
        src: ['dist/js/chrome-storage-service.js', 'dist/js/emoji-service.js', 'dist/js/preferences-service.js', 'dist/js/ascii-utils.js', 'dist/js/background.js'],
        dest: 'dist/js/background.js'
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
            src: ['manifest.json', 'html/**', 'css/**', 'js/background.js', 'js/content.js', 'js/popup.js', 'js/options.js', 'js/twemoji-2.2.3.min.js']
          }
        ]
      }
    },
    qunit: {
      all: ['test/**/*.html']
    }
  });

  grunt.registerTask("default", ["clean:prodDist", "mkdir:prodDist", "babel:prod", "copy", "concat", "compress"]);
  grunt.registerTask("test", ["babel:prod", "clean:testDist", "mkdir:testDist", "babel:test", "qunit"]);
};