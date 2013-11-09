
# grunt-extend-config

Grunt Plugin for Extending Grunt Configuration

<p/>
<img src="https://nodei.co/npm/grunt-extend-config.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/grunt-extend-config.png" alt=""/>

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/)
before, be sure to check out the [Getting
Started](http://gruntjs.com/getting-started) guide, as it explains how
to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process,
you may install this plugin with this command:

```shell
npm install grunt-extend-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-extend-config");
```

## Purpose

This Grunt extension is *NOT* a regular Grunt tasks. Instead it extends
the Grunt API with a single additional function: `grunt.extendConfig(config: Object): void`.
This function is similar to the standard `grunt.initConfig(config: Object): void`, but
allows you to incrementally establish the underlying `grunt.config` object.
The intention is that this way you can better *logically group* all your task configurations.

## Usage Example

Instead of writing...

```js
//  Gruntfile.js
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");

    grunt.initConfig({
        uglify: {
            "lib": {
                // [...]
            },
            "app": {
                // [...]
            },
            options: {
                // [...]
            }
        },
        less: {
            "lib": {
                // [...]
            },
            "app": {
                // [...]
            },
            options: {
                // [...]
            }
        }
    });

    grunt.registerTask("default", [ "lib", "app" ]);
    grunt.registerTask("lib", [ "uglify:lib", "less:lib" ]);
    grunt.registerTask("app", [ "uglify:app", "less:app" ]);
};
```

...you can split the configurations and write...

```js
//  Gruntfile.js
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-extend-config");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");

    //  general task configurations
    grunt.initConfig({
        uglify: {
            options: {
                // [...]
            }
        },
        less: {
            options: {
                // [...]
            }
        }
    });
    grunt.registerTask("default", [ "lib", "app" ]);

    //  all configurations for building the libraries
    grunt.extendConfig({
        uglify: {
            "lib": {
                // [...]
            }
        },
        less: {
            "lib": {
                // [...]
            }
        }
    });
    grunt.registerTask("lib", [ "uglify:lib", "less:lib" ]);

    //  all configurations for building the application
    grunt.extendConfig({
        uglify: {
            "app": {
                // [...]
            }
        },
        less: {
            "app": {
                // [...]
            }
        }
    });
    grunt.registerTask("app", [ "uglify:app", "less:app" ]);
};
```

