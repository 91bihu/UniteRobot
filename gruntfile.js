/**
 * Created by Administrator on 2016/11/10.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
            },
            dist: {
                src: ['public/javascripts/*.js'],//src文件夹下包括子文件夹下的所有文件
                dest: 'dist/js/built.js'//合并文件在dist下名为built.js的文件
            },
            css: {
                src: ['public/stylesheets/*.css'],//当前grunt项目中路径下的src/css目录下的所有css文件
                dest: 'dist/css/all.css'  //生成到grunt项目路径下的dist文件夹下为all.css
            }
        },
        uglify: {
            build: {
                src: 'dist/js/built.js',//压缩源文件是之前合并的buildt.js文件
                dest: 'dist/js/built.min.js'//压缩文件为built.min.js
            }
        },
        cssmin: { //css文件压缩
            css: {
                src: 'dist/css/all.css',//将之前的all.css
                dest: 'dist/css/all.min.css'  //压缩
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat','uglify','cssmin']);
}