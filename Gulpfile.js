var gulp = require('gulp'),
		concat = require('gulp-concat-css'),
		jshint = require('gulp-jshint'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		tinypng = require('gulp-tinypng');

var cssfiles = 'css/*.css',
	imgfiles = 'img/*',
	jsfiles = 'js/*.js';

imgfiles = 'img/*';

gulp.task('oai', function() {
	gulp.src(cssfiles)
		.pipe(concat('oai.css'))
		.pipe(gulp.dest('dist/css'));
	gulp.src('dist/css/oai.css')
			.pipe(minifycss())
			.pipe(rename({
				extname: '.min.css'
			}))
			.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src(jsfiles)
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulp.dest('dist/js'));
	gulp.src(['dist/js/dist.js'])
			.pipe(rename({
				extname: '.min.js'
			}))
			.pipe(uglify({
				preserveComments: 'some'
			}))
			.pipe(gulp.dest('dist/js'));
});

gulp.task('tinypng', function () {
	gulp.src(imgfiles)
		.pipe(tinypng('8eNoFlUv4wHzam_8GleKHdhH2YFk9xAd'))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default', function() {
	var css = ['villa', 'mowe', 'oai'];
	var js = ['js'];
	gulp.watch(cssfiles, css);
	gulp.watch(jsfiles, ['js']);
});