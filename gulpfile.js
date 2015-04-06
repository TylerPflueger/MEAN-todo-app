var gulp = require('gulp');
var karma = require('gulp-karma');
var shell = require('gulp-shell');

var testFiles = [
	'bower_components/angular/angular.js',
	'bower_components/angular-mocks/angular-mocks.js',
	'bower_components/angular-resource/angular-resource.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/lodash/lodash.js',
	'public/javascripts/app.js',
	'public/javascripts/controllers/*.js',
	'public/javascripts/directives/*.js',
	'public/javascripts/services/*.js',
	'public/javascripts/*.js',
	'public/javascripts/test/*.js',
	'public/javascripts/test/**/*.js'
];

var serverDir = [
	'bower_components/angular/angular.js',
	'bower_components/angular-mocks/angular-mocks.js',
	'bower_components/angular-resource/angular-resource.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/lodash/lodash.js',
	'views/*.js',
	'test/**/*.js',
	'test/*.js',
	'routes/**/*.js',
	'routes/*.js',
	'models/**/*.js',
	'models/*.js',
	'app.js'
];

gulp.task('test', function() {
	// Be sure to return the stream
	return gulp.src(testFiles)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}))
		.on('error', function(err) {
			// Make sure failed tests cause gulp to exit non-zero
			//throw err;
		});
});

gulp.task('default', ['test', 'testServer']);

gulp.task('testServer', shell.task('jasmine-node-karma test/api.spec.js --autotest'));