module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-ftp-deploy");
    grunt.initConfig({
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["scripts/components/*.js"],
                dest: "scripts/script.js"
            }
        },
        uglify: {
            my_target: {
                files: {
                    "scripts/script.min.js": ["scripts/script.js"]
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: "expanded"
                },
                files: {
                    "styles/style.css": "styles/style.scss"
                }
            }
        },
        autoprefixer: {
            dist: {
                src: "styles/style.css"
            }
        },
        watch: {
            styles: {
                files: ["styles/*.scss", "styles/0_settings/*.scss", "styles/1_base/*.scss", "styles/2_elements/*.scss", "styles/3_modules/*.scss", "styles/4_layout/*.scss", "scripts/components/*.js", "scripts/lib/*.js"],
                tasks: ["sass", "autoprefixer", "concat", "uglify", "ftp-deploy"],
                options: {
                    livereload: true
                }
            }
        },
        "ftp-deploy": {
            build: {
                auth: {
                    host: "progeno-dev.de",
                    port: 21,
                    authKey: "key1"
                },
                src: "styles",
                dest: "files/progeno/styles",
                exclusions: ["build/**/.DS_Store", "build/**/Thumbs.db"]
            }
        }
    });

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("js", ["concat", "uglify"]);
};
