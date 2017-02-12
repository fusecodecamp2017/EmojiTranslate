module.exports = function(grunt) {
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
    babel: {
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
            dest: 'dist',
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
          }
        ]
      }
    },
    browserify: {
      prod: {
        src: ['dist/*.js'],
        dest: 'dist/module.js'
      },
      test: {
        src: [
          'test/dist/emojify-test.js'
        ],
        dest: 'test/dist/all-tests.js'
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
            src: ['module.js', 'manifest.json', 'html/**', 'css/**']
          }
        ]
      }
    },
    qunit: {
      all: ['test/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['qunit']);
};