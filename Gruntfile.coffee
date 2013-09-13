path = require 'path'

# Build configurations.
module.exports = (grunt) ->
    grunt.initConfig
        # Deletes built file and temp directories.
        clean:
            working:
                src: [
                    'ng-finder.*'
                    './.temp/views'
                    './.temp/'
                ]
        copy:
            styles:
                files: [
                    src: './src/styles/ng-finder.css'
                    dest: './ng-finder.css'
                ]

        uglify:
            # concat js files before minification
            js:
                src: ['ng-finder.src.js']
                dest: 'ng-finder.js'
                options:
                  sourceMap: (fileName) ->
                    fileName.replace /\.js$/, '.map'

        concat:
            js:
                src: ['src/scripts/intro.js', 'src/scripts/directive.js', 'src/scripts/outro.js']
                dest: 'ng-finder.src.js'

        less:
            css:
                files:
                    'ng-finder.css': 'src/styles/ng-finder.less'

        cssmin:
            css:
                files:
                    'ng-finder.css': 'ng-finder.css'

        ngTemplateCache:
            views:
                files:
                    './.temp/scripts/views.js': './src/views/**/*.html'
                options:
                    trim: './.temp/'
                    module: 'ngFinder'

    # Register grunt tasks supplied by grunt-contrib-*.
    # Referenced in package.json.
    # https://github.com/gruntjs/grunt-contrib
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-concat'


    # Register grunt tasks supplied by grunt-hustler.
    # Referenced in package.json.
    # https://github.com/CaryLandholt/grunt-hustler
    grunt.loadNpmTasks 'grunt-hustler'

    grunt.registerTask 'dev', [
        'clean'
        'ngTemplateCache'
        'concat'
        'less'
        'copy'
    ]
    grunt.registerTask 'default', [
        'dev'
        'uglify'
        'cssmin'
    ]
