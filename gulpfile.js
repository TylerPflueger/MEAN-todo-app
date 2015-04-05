var gulp = require('gulp');
var karma = require('gulp-karma');
var jasmine = require('gulp-jasmine-phantom');
var shell = require('gulp-shell');

var testFiles = [

];

var serverDir = [
	'./views/*.js',
	'./test/**/*.js',
	'./test/*.js',
	'./routes/**/*.js',
	'./routes/*.js',
	'./models/**/*.js',
	'./models/*.js',
	'app.js'
];

gulp.task('test', function() {
	// Be sure to return the stream
	return gulp.src(testFiles)
		.pipe(karma({
			configFile: 'public/javascripts/karma.conf.js',
			action: 'watch'
		}))
		.on('error', function(err) {
			// Make sure failed tests cause gulp to exit non-zero
			//throw err;
		});
});

gulp.task('default', ['test', 'testServer', 'watchServerFiles']);

gulp.task('watchServerFiles', function() {
	gulp.watch(serverDir, ['testServer']);
});
gulp.task('testServer', shell.task('jasmine-node-karma test/api.spec.js'));