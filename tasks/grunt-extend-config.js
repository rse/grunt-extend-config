/*
**  grunt-extend-config -- Grunt Plugin for Extending Grunt Configuration
**  Copyright (c) 2013-2014 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module: false */

module.exports = function (grunt) {
    /*  extend the public Grunt API  */
    grunt.extendConfig = function (config) {

        /*  iterate over all config entries (the task configurations)  */
        grunt.util._.forEach(config, function (taskConfig, taskName) {

            /*  iterate over all task entries (the target configurations)  */
            grunt.util._.forEach(taskConfig, function (targetConfig, targetName) {

                /*  merge configuration  */
                if (targetName === "options") {
                    /*  merge the special option configuration in parts
                        (to allow establishing defaults incrementally)
                        into the global Grunt configuration  */
                    grunt.util._.forEach(targetConfig, function (optionValue, optionName) {
                        grunt.config.set([ taskName, targetName, optionName ], optionValue);
                    });
                }
                else {
                    /*  merge the target configuration as a whole
                        into the global Grunt configuration  */
                    grunt.config.set([ taskName, targetName ], targetConfig);
                }
            });
        });
    };
};

